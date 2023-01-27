import { addHexPrefix, isHexString } from 'ethereumjs-util';
import * as actionConstants from '../../store/actionConstants';
import { AlertTypes } from '../../../shared/constants/alerts';
import {
  GasEstimateTypes,
  NetworkCongestionThresholds,
} from '../../../shared/constants/gas';
import {
  accountsWithSendEtherInfoSelector,
  checkNetworkAndAccountSupports1559,
  getAddressBook,
  getUseCurrencyRateCheck,
} from '../../selectors';
import { updateTransactionGasFees } from '../../store/actions';
import { setCustomGasLimit, setCustomGasPrice } from '../gas/gas.duck';

import { HardwareKeyringTypes } from '../../../shared/constants/hardware-wallets';
import { isEqualCaseInsensitive } from '../../../shared/modules/string-utils';
import { stripHexPrefix } from '../../../shared/modules/hexstring-utils';
import {
  decGWEIToHexWEI,
  hexToDecimal,
} from '../../../shared/modules/conversion.utils';

const initialState = {
  isInitialized: false,
  isUnlocked: false,
  isAccountMenuOpen: false,
  identities: {},
  unapprovedTxs: {},
  frequentRpcList: [],
  addressBook: [],
  contractExchangeRates: {},
  pendingTokens: {},
  customNonceValue: '',
  useBlockie: false,
  featureFlags: {},
  welcomeScreenSeen: false,
  currentLocale: '',
  currentBlockGasLimit: '',
  preferences: {
    autoLockTimeLimit: undefined,
    showFiatInTestnets: false,
    showTestNetworks: false,
    useNativeCurrencyAsPrimaryCurrency: true,
  },
  firstTimeFlowType: null,
  completedOnboarding: false,
  knownMethodData: {},
  participateInMetaMetrics: null,
  nextNonce: null,
  conversionRate: null,
  nativeCurrency: 'ETH',
};

/**
 * Temporary types for this slice so that inferrence of MetaMask state tree can
 * occur
 *
 * @param {typeof initialState} state - State
 * @param {any} action
 * @returns {typeof initialState}
 */
export default function reduceMetamask(state = initialState, action) {
  switch (action.type) {
    case actionConstants.UPDATE_METAMASK_STATE:
      return { ...state, ...action.value };

    case actionConstants.LOCK_METAMASK:
      return {
        ...state,
        isUnlocked: false,
      };

    case actionConstants.SET_ACCOUNT_LABEL: {
      const { account } = action.value;
      const name = action.value.label;
      const id = {};
      id[account] = { ...state.identities[account], name };
      const identities = { ...state.identities, ...id };
      return Object.assign(state, { identities });
    }

    case actionConstants.UPDATE_CUSTOM_NONCE:
      return {
        ...state,
        customNonceValue: action.value,
      };

    case actionConstants.TOGGLE_ACCOUNT_MENU:
      return {
        ...state,
        isAccountMenuOpen: !state.isAccountMenuOpen,
      };

    case actionConstants.UPDATE_TRANSACTION_PARAMS: {
      const { id: txId, value } = action;
      let { currentNetworkTxList } = state;
      currentNetworkTxList = currentNetworkTxList.map((tx) => {
        if (tx.id === txId) {
          const newTx = { ...tx };
          newTx.txParams = value;
          return newTx;
        }
        return tx;
      });

      return {
        ...state,
        currentNetworkTxList,
      };
    }

    case actionConstants.SET_PARTICIPATE_IN_METAMETRICS:
      return {
        ...state,
        participateInMetaMetrics: action.value,
      };

    case actionConstants.CLOSE_WELCOME_SCREEN:
      return {
        ...state,
        welcomeScreenSeen: true,
      };

    case actionConstants.SET_PENDING_TOKENS:
      return {
        ...state,
        pendingTokens: { ...action.payload },
      };

    case actionConstants.CLEAR_PENDING_TOKENS: {
      return {
        ...state,
        pendingTokens: {},
      };
    }

    case actionConstants.COMPLETE_ONBOARDING: {
      return {
        ...state,
        completedOnboarding: true,
      };
    }

    case actionConstants.SET_FIRST_TIME_FLOW_TYPE: {
      return {
        ...state,
        firstTimeFlowType: action.value,
      };
    }

    case actionConstants.SET_NEXT_NONCE: {
      return {
        ...state,
        nextNonce: action.payload,
      };
    }

    default:
      return state;
  }
}

const toHexWei = (value, expectHexWei) => {
  return addHexPrefix(expectHexWei ? value : decGWEIToHexWEI(value));
};

// Action Creators
export function updateGasFees({
  gasPrice,
  gasLimit,
  maxPriorityFeePerGas,
  maxFeePerGas,
  transaction,
  expectHexWei = false,
}) {
  return async (dispatch) => {
    const txParamsCopy = { ...transaction.txParams, gas: gasLimit };
    if (gasPrice) {
      dispatch(
        setCustomGasPrice(toHexWei(txParamsCopy.gasPrice, expectHexWei)),
      );
      txParamsCopy.gasPrice = toHexWei(gasPrice, expectHexWei);
    } else if (maxFeePerGas && maxPriorityFeePerGas) {
      txParamsCopy.maxFeePerGas = toHexWei(maxFeePerGas, expectHexWei);
      txParamsCopy.maxPriorityFeePerGas = addHexPrefix(
        decGWEIToHexWEI(maxPriorityFeePerGas),
      );
    }
    const updatedTx = {
      ...transaction,
      txParams: txParamsCopy,
    };

    const customGasLimit = isHexString(addHexPrefix(gasLimit))
      ? addHexPrefix(gasLimit)
      : addHexPrefix(gasLimit.toString(16));
    dispatch(setCustomGasLimit(customGasLimit));
    await dispatch(updateTransactionGasFees(updatedTx.id, updatedTx));
  };
}

// Selectors

export const getAlertEnabledness = (state) => state.metamask.alertEnabledness;

export const getUnconnectedAccountAlertEnabledness = (state) =>
  getAlertEnabledness(state)[AlertTypes.unconnectedAccount];

export const getWeb3ShimUsageAlertEnabledness = (state) =>
  getAlertEnabledness(state)[AlertTypes.web3ShimUsage];

export const getUnconnectedAccountAlertShown = (state) =>
  state.metamask.unconnectedAccountAlertShownOrigins;

export const getPendingTokens = (state) => state.metamask.pendingTokens;

export const getTokens = (state) => state.metamask.tokens;

export function getCollectiblesDropdownState(state) {
  return state.metamask.collectiblesDropdownState;
}

export const getCollectibles = (state) => {
  const {
    metamask: {
      allNfts,
      provider: { chainId },
      selectedAddress,
    },
  } = state;

  const chainIdAsDecimal = hexToDecimal(chainId);

  return allNfts?.[selectedAddress]?.[chainIdAsDecimal] ?? [];
};

export const getCollectibleContracts = (state) => {
  const {
    metamask: {
      allNftContracts,
      provider: { chainId },
      selectedAddress,
    },
  } = state;

  const chainIdAsDecimal = hexToDecimal(chainId);

  return allNftContracts?.[selectedAddress]?.[chainIdAsDecimal] ?? [];
};

export function getBlockGasLimit(state) {
  return state.metamask.currentBlockGasLimit;
}

export function getConversionRate(state) {
  return state.metamask.conversionRate;
}

export function getNativeCurrency(state) {
  const useCurrencyRateCheck = getUseCurrencyRateCheck(state);
  return useCurrencyRateCheck
    ? state.metamask.nativeCurrency
    : state.metamask.provider.ticker;
}

export function getSendHexDataFeatureFlagState(state) {
  return state.metamask.featureFlags.sendHexData;
}

export function getSendToAccounts(state) {
  const fromAccounts = accountsWithSendEtherInfoSelector(state);
  const addressBookAccounts = getAddressBook(state);
  return [...fromAccounts, ...addressBookAccounts];
}

export function getUnapprovedTxs(state) {
  return state.metamask.unapprovedTxs;
}

/**
 * Function returns true if network details are fetched and it is found to not support EIP-1559
 *
 * @param state
 */
export function isNotEIP1559Network(state) {
  return state.metamask.networkDetails?.EIPS[1559] === false;
}

/**
 * Function returns true if network details are fetched and it is found to support EIP-1559
 *
 * @param state
 */
export function isEIP1559Network(state) {
  return state.metamask.networkDetails?.EIPS[1559] === true;
}

export function getGasEstimateType(state) {
  return state.metamask.gasEstimateType;
}

export function getGasFeeEstimates(state) {
  return state.metamask.gasFeeEstimates;
}

export function getEstimatedGasFeeTimeBounds(state) {
  return state.metamask.estimatedGasFeeTimeBounds;
}

export function getIsGasEstimatesLoading(state) {
  const networkAndAccountSupports1559 =
    checkNetworkAndAccountSupports1559(state);
  const gasEstimateType = getGasEstimateType(state);

  // We consider the gas estimate to be loading if the gasEstimateType is
  // 'NONE' or if the current gasEstimateType cannot be supported by the current
  // network
  const isEIP1559TolerableEstimateType =
    gasEstimateType === GasEstimateTypes.feeMarket ||
    gasEstimateType === GasEstimateTypes.ethGasPrice;
  const isGasEstimatesLoading =
    gasEstimateType === GasEstimateTypes.none ||
    (networkAndAccountSupports1559 && !isEIP1559TolerableEstimateType) ||
    (!networkAndAccountSupports1559 &&
      gasEstimateType === GasEstimateTypes.feeMarket);

  return isGasEstimatesLoading;
}

export function getIsNetworkBusy(state) {
  const gasFeeEstimates = getGasFeeEstimates(state);
  return gasFeeEstimates?.networkCongestion >= NetworkCongestionThresholds.busy;
}

export function getCompletedOnboarding(state) {
  return state.metamask.completedOnboarding;
}
export function getIsInitialized(state) {
  return state.metamask.isInitialized;
}

export function getIsUnlocked(state) {
  return state.metamask.isUnlocked;
}

export function getSeedPhraseBackedUp(state) {
  return state.metamask.seedPhraseBackedUp;
}

/**
 * Given the redux state object and an address, finds a keyring that contains that address, if one exists
 *
 * @param {object} state - the redux state object
 * @param {string} address - the address to search for among the keyring addresses
 * @returns {object | undefined} The keyring which contains the passed address, or undefined
 */
export function findKeyringForAddress(state, address) {
  const keyring = state.metamask.keyrings.find((kr) => {
    return kr.accounts.some((account) => {
      return (
        isEqualCaseInsensitive(account, addHexPrefix(address)) ||
        isEqualCaseInsensitive(account, stripHexPrefix(address))
      );
    });
  });

  return keyring;
}

/**
 * Given the redux state object, returns the users preferred ledger transport type
 *
 * @param {object} state - the redux state object
 * @returns {string} The users preferred ledger transport type. One of'ledgerLive', 'webhid' or 'u2f'
 */
export function getLedgerTransportType(state) {
  return state.metamask.ledgerTransportType;
}

/**
 * Given the redux state object and an address, returns a boolean indicating whether the passed address is part of a Ledger keyring
 *
 * @param {object} state - the redux state object
 * @param {string} address - the address to search for among all keyring addresses
 * @returns {boolean} true if the passed address is part of a ledger keyring, and false otherwise
 */
export function isAddressLedger(state, address) {
  const keyring = findKeyringForAddress(state, address);

  return keyring?.type === HardwareKeyringTypes.ledger;
}

/**
 * Given the redux state object, returns a boolean indicating whether the user has any Ledger accounts added to MetaMask (i.e. Ledger keyrings
 * in state)
 *
 * @param {object} state - the redux state object
 * @returns {boolean} true if the user has a Ledger account and false otherwise
 */
export function doesUserHaveALedgerAccount(state) {
  return state.metamask.keyrings.some((kr) => {
    return kr.type === HardwareKeyringTypes.ledger;
  });
}
