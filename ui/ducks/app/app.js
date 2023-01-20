import {
  WebHIDConnectedStatuses,
  HardwareTransportStates,
} from '../../../shared/constants/hardware-wallets';
import { ActionConstants } from '../../store/constants/actions';

export default function reduceApp(state = {}, action) {
  // default state
  const appState = {
    shouldClose: false,
    menuOpen: false,
    modal: {
      open: false,
      modalState: {
        name: null,
        props: {},
      },
      previousModalState: {
        name: null,
      },
    },
    alertOpen: false,
    alertMessage: null,
    qrCodeData: null,
    networkDropdownOpen: false,
    accountDetail: {
      subview: 'transactions',
    },
    // Used to display loading indicator
    isLoading: false,
    // Used to display error text
    warning: null,
    buyView: {},
    isMouseUser: false,
    defaultHdPaths: {
      trezor: `m/44'/60'/0'/0`,
      ledger: `m/44'/60'/0'/0/0`,
      lattice: `m/44'/60'/0'/0`,
    },
    networksTabSelectedRpcUrl: '',
    loadingMethodData: false,
    requestAccountTabs: {},
    openMetaMaskTabs: {},
    currentWindowTab: {},
    showWhatsNewPopup: true,
    singleExceptions: {
      testKey: null,
    },
    gasLoadingAnimationIsShowing: false,
    smartTransactionsError: null,
    smartTransactionsErrorMessageDismissed: false,
    ledgerWebHidConnectedStatus: WebHIDConnectedStatuses.unknown,
    ledgerTransportStatus: HardwareTransportStates.none,
    newNetworkAdded: '',
    newCollectibleAddedMessage: '',
    removeCollectibleMessage: '',
    portfolioTooltipWasShownInThisSession: false,
    sendInputCurrencySwitched: false,
    newTokensImported: '',
    newCustomNetworkAdded: {},
    onboardedInThisUISession: false,
    customTokenAmount: '',
    ...state,
  };

  switch (action.type) {
    // dropdown methods
    case ActionConstants.networkDropdownOpen:
      return {
        ...appState,
        networkDropdownOpen: true,
      };

    case ActionConstants.networkDropdownClose:
      return {
        ...appState,
        networkDropdownOpen: false,
      };

    // alert methods
    case ActionConstants.alertOpen:
      return {
        ...appState,
        alertOpen: true,
        alertMessage: action.value,
      };

    case ActionConstants.alertClose:
      return {
        ...appState,
        alertOpen: false,
        alertMessage: null,
      };

    // qr scanner methods
    case ActionConstants.qrCodeDetected:
      return {
        ...appState,
        qrCodeData: action.value,
      };

    // Smart Transactions errors.
    case ActionConstants.setSmartTransactionsError:
      return {
        ...appState,
        smartTransactionsError: action.payload,
      };

    case ActionConstants.dismissSmartTransactionsError:
      return {
        ...appState,
        smartTransactionsErrorMessageDismissed: true,
      };

    // modal methods:
    case ActionConstants.modalOpen: {
      const { name, ...modalProps } = action.payload;

      return {
        ...appState,
        modal: {
          open: true,
          modalState: {
            name,
            props: { ...modalProps },
          },
          previousModalState: { ...appState.modal.modalState },
        },
      };
    }

    case ActionConstants.modalClose:
      return {
        ...appState,
        modal: Object.assign(
          appState.modal,
          { open: false },
          { modalState: { name: null, props: {} } },
          { previousModalState: appState.modal.modalState },
        ),
      };

    case ActionConstants.clearAccountDetails:
      return {
        ...appState,
        accountDetail: {},
      };

    case ActionConstants.forgotPassword:
      return {
        ...appState,
        forgottenPassword: action.value,
      };

    case ActionConstants.showSendTokenPage:
      return {
        ...appState,
        warning: null,
      };

    case ActionConstants.lockMetamask:
      return {
        ...appState,
        warning: null,
      };

    // accounts

    case ActionConstants.goHome:
      return {
        ...appState,
        accountDetail: {
          subview: 'transactions',
          accountExport: 'none',
          privateKey: '',
        },
        warning: null,
      };

    case ActionConstants.showAccountDetail:
      return {
        ...appState,
        forgottenPassword: appState.forgottenPassword
          ? !appState.forgottenPassword
          : null,
        accountDetail: {
          subview: 'transactions',
          accountExport: 'none',
          privateKey: '',
        },
      };

    case ActionConstants.showAccountsPage:
      return {
        ...appState,
        isLoading: false,
        warning: null,
        scrollToBottom: false,
        forgottenPassword: false,
      };

    case ActionConstants.showConfTxPage:
      return {
        ...appState,
        txId: action.id,
        warning: null,
        isLoading: false,
      };

    case ActionConstants.completedTx:
      if (action.value.unconfirmedActionsCount > 0) {
        return {
          ...appState,
          txId: null,
          warning: null,
        };
      }
      return {
        ...appState,
        // indicate notification should close
        shouldClose: true,
        warning: null,
        txId: null,
        accountDetail: {
          subview: 'transactions',
        },
      };

    case ActionConstants.transactionError:
      return {
        ...appState,
      };

    case ActionConstants.unlockFailed:
      return {
        ...appState,
        warning: action.value || 'Incorrect password. Try again.',
      };

    case ActionConstants.unlockSucceeded:
      return {
        ...appState,
        warning: '',
      };

    case ActionConstants.setHardwareWalletDefaultHdPath: {
      const { device, path } = action.value;
      const newDefaults = { ...appState.defaultHdPaths };
      newDefaults[device] = path;

      return {
        ...appState,
        defaultHdPaths: newDefaults,
      };
    }

    case ActionConstants.showLoadingIndication:
      return {
        ...appState,
        isLoading: true,
        loadingMessage: action.value,
      };

    case ActionConstants.hideLoadingIndication:
      return {
        ...appState,
        isLoading: false,
      };

    case ActionConstants.displayWarning:
      return {
        ...appState,
        warning: action.value,
        isLoading: false,
      };

    case ActionConstants.hideWarning:
      return {
        ...appState,
        warning: undefined,
      };

    case ActionConstants.showPrivateKey:
      return {
        ...appState,
        accountDetail: {
          subview: 'export',
          accountExport: 'completed',
          privateKey: action.value,
        },
      };

    case ActionConstants.setMouseUserState:
      return {
        ...appState,
        isMouseUser: action.value,
      };

    case ActionConstants.setSelectedSettingsRpcUrl:
      return {
        ...appState,
        networksTabSelectedRpcUrl: action.value,
      };

    case ActionConstants.setNewNetworkAdded:
      return {
        ...appState,
        newNetworkAdded: action.value,
      };

    case ActionConstants.setNewTokensImported:
      return {
        ...appState,
        newTokensImported: action.value,
      };

    case ActionConstants.setNewCollectibleAddedMessage:
      return {
        ...appState,
        newCollectibleAddedMessage: action.value,
      };

    case ActionConstants.setRemoveCollectibleMessage:
      return {
        ...appState,
        removeCollectibleMessage: action.value,
      };

    case ActionConstants.portfolioTooltipWasShownInThisSession:
      return {
        ...appState,
        portfolioTooltipWasShownInThisSession: true,
      };

    case ActionConstants.loadingMethodDataStarted:
      return {
        ...appState,
        loadingMethodData: true,
      };

    case ActionConstants.loadingMethodDataFinished:
      return {
        ...appState,
        loadingMethodData: false,
      };

    case ActionConstants.setRequestAccountTabs:
      return {
        ...appState,
        requestAccountTabs: action.value,
      };

    case ActionConstants.setOpenMetamaskTabIds:
      return {
        ...appState,
        openMetaMaskTabs: action.value,
      };

    case ActionConstants.setCurrentWindowTab:
      return {
        ...appState,
        currentWindowTab: action.value,
      };

    case ActionConstants.hideWhatsNewPopup:
      return {
        ...appState,
        showWhatsNewPopup: false,
      };

    case ActionConstants.captureSingleException:
      return {
        ...appState,
        singleExceptions: {
          ...appState.singleExceptions,
          [action.value]: null,
        },
      };

    case ActionConstants.toggleGasLoadingAnimation:
      return {
        ...appState,
        gasLoadingAnimationIsShowing: action.value,
      };

    case ActionConstants.setWebhidConnectedStatus:
      return {
        ...appState,
        ledgerWebHidConnectedStatus: action.value,
      };

    case ActionConstants.setLedgerTransportStatus:
      return {
        ...appState,
        ledgerTransportStatus: action.value,
      };
    case ActionConstants.toggleCurrencyInputSwitch:
      return {
        ...appState,
        sendInputCurrencySwitched: !appState.sendInputCurrencySwitched,
      };
    case ActionConstants.setNewCustomNetworkAdded:
      return {
        ...appState,
        newCustomNetworkAdded: action.value,
      };
    case ActionConstants.onboardedInThisUiSession:
      return {
        ...appState,
        onboardedInThisUISession: action.value,
      };
    case ActionConstants.setCustomTokenAmount:
      return {
        ...appState,
        customTokenAmount: action.value,
      };
    default:
      return appState;
  }
}

// Action Creators
export function hideWhatsNewPopup() {
  return {
    type: ActionConstants.hideWhatsNewPopup,
  };
}

export function setPortfolioTooltipWasShownInThisSession() {
  return {
    type: ActionConstants.portfolioTooltipWasShownInThisSession,
  };
}

export function toggleGasLoadingAnimation(value) {
  return { type: ActionConstants.toggleGasLoadingAnimation, value };
}

export function setLedgerWebHidConnectedStatus(value) {
  return { type: ActionConstants.setWebhidConnectedStatus, value };
}

export function setLedgerTransportStatus(value) {
  return { type: ActionConstants.setLedgerTransportStatus, value };
}

// Selectors
export function getQrCodeData(state) {
  return state.appState.qrCodeData;
}

export function getGasLoadingAnimationIsShowing(state) {
  return state.appState.gasLoadingAnimationIsShowing;
}

export function getLedgerWebHidConnectedStatus(state) {
  return state.appState.ledgerWebHidConnectedStatus;
}

export function getLedgerTransportStatus(state) {
  return state.appState.ledgerTransportStatus;
}

export function getPortfolioTooltipWasShownInThisSession(state) {
  return state.appState.portfolioTooltipWasShownInThisSession;
}

export function toggleCurrencySwitch() {
  return { type: ActionConstants.toggleCurrencyInputSwitch };
}

export function setNewCustomNetworkAdded(value) {
  return { type: ActionConstants.setNewCustomNetworkAdded, value };
}

export function setOnBoardedInThisUISession(value) {
  return { type: ActionConstants.onboardedInThisUiSession, value };
}

export function setCustomTokenAmount(value) {
  return { type: ActionConstants.setCustomTokenAmount, value };
}
