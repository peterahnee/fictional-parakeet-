import { TEST_CHAINS } from '../../../shared/constants/network';
import migration78 from './078';

describe('migration #78', () => {
  it('should update the version metadata', async () => {
    const oldStorage = {
      meta: {
        version: 77,
      },
      data: {},
    };

    const newStorage = await migration78.migrate(oldStorage);
    expect(newStorage.meta).toStrictEqual({
      version: 78,
    });
  });

  it('should update the advancedGasFee object', async () => {
    const oldStorage = {
      meta: {},
      data: {
        PreferencesController: {
          advancedGasFee: {
            maxBaseFee: 10,
            priorityFee: 10,
          },
        },
        NetworkController: {
          provider: {
            chainId: TEST_CHAINS[0],
          },
        },
      },
    };

    const newStorage = await migration78.migrate(oldStorage);
    const newAdvancedGasFee = {
      '0x5': {
        maxBaseFee: 10,
        priorityFee: 10,
      },
    };
    expect(newStorage.data.PreferencesController.advancedGasFee).toStrictEqual(
      newAdvancedGasFee,
    );
  });

  it('should not change anything if the advancedGasFee is not set', async () => {
    const oldStorage = {
      meta: {},
      data: {
        PreferencesController: {
          frequentRpcListDetail: [],
          useBlockie: false,
          useNonceField: false,
          usePhishDetect: true,
          dismissSeedBackUpReminder: false,
          useMultiAccountBalanceChecker: true,
          useTokenDetection: false,
          useNftDetection: false,
          openSeaEnabled: false,
          advancedGasFee: {},
          featureFlags: {
            showIncomingTransactions: true,
          },
          knownMethodData: {},
          identities: {},
          lostIdentities: {},
          forgottenPassword: false,
          preferences: {
            autoLockTimeLimit: undefined,
            showFiatInTestnets: false,
            showTestNetworks: false,
            useNativeCurrencyAsPrimaryCurrency: true,
            hideZeroBalanceTokens: false,
          },
          infuraBlocked: null,
          theme: 'light',
          improvedTokenAllowanceEnabled: false,
          transactionSecurityCheckEnabled: false,
        },
        NetworkController: {
          provider: {
            chainId: TEST_CHAINS[0],
          },
        },
      },
    };

    const newStorage = await migration78.migrate(oldStorage);

    expect(newStorage).toStrictEqual({
      meta: {
        version: 78,
      },
      data: {
        PreferencesController: {
          frequentRpcListDetail: [],
          useBlockie: false,
          useNonceField: false,
          usePhishDetect: true,
          dismissSeedBackUpReminder: false,
          useMultiAccountBalanceChecker: true,
          useTokenDetection: false,
          useNftDetection: false,
          openSeaEnabled: false,
          advancedGasFee: {
            '0x5': {},
          },
          featureFlags: {
            showIncomingTransactions: true,
          },
          knownMethodData: {},
          identities: {},
          lostIdentities: {},
          forgottenPassword: false,
          preferences: {
            autoLockTimeLimit: undefined,
            showFiatInTestnets: false,
            showTestNetworks: false,
            useNativeCurrencyAsPrimaryCurrency: true,
            hideZeroBalanceTokens: false,
          },
          infuraBlocked: null,
          theme: 'light',
          improvedTokenAllowanceEnabled: false,
          transactionSecurityCheckEnabled: false,
        },
        NetworkController: {
          provider: {
            chainId: TEST_CHAINS[0],
          },
        },
      },
    });
  });

  it('should not change anything if the advancedGasFee is set', async () => {
    const oldStorage = {
      meta: {},
      data: {
        PreferencesController: {
          frequentRpcListDetail: [],
          useBlockie: false,
          useNonceField: false,
          usePhishDetect: true,
          dismissSeedBackUpReminder: false,
          useMultiAccountBalanceChecker: true,
          useTokenDetection: false,
          useNftDetection: false,
          openSeaEnabled: false,
          advancedGasFee: {
            maxBaseFee: 10,
            priorityFee: 10,
          },
          featureFlags: {
            showIncomingTransactions: true,
          },
          knownMethodData: {},
          identities: {},
          lostIdentities: {},
          forgottenPassword: false,
          preferences: {
            autoLockTimeLimit: undefined,
            showFiatInTestnets: false,
            showTestNetworks: false,
            useNativeCurrencyAsPrimaryCurrency: true,
            hideZeroBalanceTokens: false,
          },
          infuraBlocked: null,
          theme: 'light',
          improvedTokenAllowanceEnabled: false,
          transactionSecurityCheckEnabled: false,
        },
        NetworkController: {
          provider: {
            chainId: TEST_CHAINS[0],
          },
        },
      },
    };

    const newStorage = await migration78.migrate(oldStorage);

    expect(newStorage).toStrictEqual({
      meta: {
        version: 78,
      },
      data: {
        PreferencesController: {
          frequentRpcListDetail: [],
          useBlockie: false,
          useNonceField: false,
          usePhishDetect: true,
          dismissSeedBackUpReminder: false,
          useMultiAccountBalanceChecker: true,
          useTokenDetection: false,
          useNftDetection: false,
          openSeaEnabled: false,
          advancedGasFee: {
            '0x5': {
              maxBaseFee: 10,
              priorityFee: 10,
            },
          },
          featureFlags: {
            showIncomingTransactions: true,
          },
          knownMethodData: {},
          identities: {},
          lostIdentities: {},
          forgottenPassword: false,
          preferences: {
            autoLockTimeLimit: undefined,
            showFiatInTestnets: false,
            showTestNetworks: false,
            useNativeCurrencyAsPrimaryCurrency: true,
            hideZeroBalanceTokens: false,
          },
          infuraBlocked: null,
          theme: 'light',
          improvedTokenAllowanceEnabled: false,
          transactionSecurityCheckEnabled: false,
        },
        NetworkController: {
          provider: {
            chainId: TEST_CHAINS[0],
          },
        },
      },
    });
  });
});
