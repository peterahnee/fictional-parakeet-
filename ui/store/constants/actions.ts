export enum ActionConstants {
  // Modal state
  modalOpen = 'uiModalOpen',
  modalClose = 'uiModalClose',
  // Alert state
  alertOpen = 'uiAlertOpen',
  alertClose = 'uiAlertClose',
  qrCodeDetected = 'uiQrCodeDetected',
  // Network dropdown state
  networkDropdownOpen = 'networkDropdownOpen',
  networkDropdownClose = 'networkDropdownClose',
  // Remote state
  updateMetamaskState = 'updateMetamaskState',
  selectedAddressChanged = 'selectedAddressChanged',
  selectedAccountChanged = 'selectedAccountChanged',
  accountChanged = 'accountChanged',
  chainChanged = 'chainChanged',
  addressBookUpdated = 'addressBookUpdated',
  gasFeeEstimatesUpdated = 'gasFeeEstimatesUpdated',
  forgotPassword = 'forgotPassword',
  closeWelcomeScreen = 'closeWelcomeScreen',
  // Unlock screen state
  unlockInProgress = 'unlockInProgress',
  unlockFailed = 'unlockFailed',
  unlockSucceeded = 'unlockSucceeded',
  lockMetamask = 'lockMetamask',
  // Error state
  displayWarning = 'displayWarning',
  hideWarning = 'hideWarning',
  captureSingleException = 'captureSingleException',
  // Accounts screen state
  showAccountDetail = 'showAccountDetail',
  showAccountsPage = 'showAccountsPage',
  toggleAccountMenu = 'toggleAccountMenu',
  // Account detail screen state
  showSendTokenPage = 'showSendTokenPage',
  showPrivateKey = 'showPrivateKey',
  setAccountLabel = 'setAccountLabel',
  clearAccountDetails = 'clearAccountDetails',
  // TX Conf screen state
  showConfTxPage = 'showConfTxPage',
  completedTx = 'completedTx',
  transactionError = 'transactionError',
  updateTransactionParams = 'updateTransactionParams',
  setNextNonce = 'setNextNonce',
  // Configuration screen state
  setRpcTarget = 'setRpcTarget',
  setProviderType = 'setProviderType',
  setHardwareWalletDefaultHdPath = 'setHardwareWalletDefaultHdPath',
  // Loading state
  showLoadingIndication = 'showLoadingIndication',
  hideLoadingIndication = 'hideLoadingIndication',
  // Onboarding State
  completeOnboarding = 'completeOnboarding',
  onboardedInThisUiSession = 'onboardedInThisUiSession',
  setMouseUserState = 'setMouseUserState',
  setFirstTimeFlowType = 'setFirstTimeFlowType',
  // Home screen state
  goHome = 'goHome',
  hideWhatsNewPopup = 'hideWhatsNewPopup',
  portfolioTooltipWasShownInThisSession = 'portfolioTooltipWasShownInThisSession',
  toggleGasLoadingAnimation = 'toggleGasLoadingAnimation',
  // Preferences state
  setUseBlockie = 'setUseBlockie',
  setUseNoncefield = 'setUseNoncefield',
  updateCustomNonce = 'updateCustomNonce',
  setIpfsGateway = 'setIpfsGateway',
  setParticipateInMetametrics = 'setParticipateInMetametrics',
  updatePreferences = 'updatePreferences',
  // Locate State
  setCurrentLocale = 'setCurrentLocale',
  // Feature Flags
  updateFeatureFlags = 'updateFeatureFlags',
  // Ledger State
  setWebhidConnectedStatus = 'setWebhidConnectedStatus',
  setLedgerTransportStatus = 'setLedgerTransportStatus',
  // Network state
  setSelectedSettingsRpcUrl = 'setSelectedSettingsRpcUrl',
  setNewNetworkAdded = 'setNewNetworkAdded',
  setNewCollectibleAddedMessage = 'setNewCollectibleAddedMessage',
  setNewCustomNetworkAdded = 'setNewCustomNetworkAdded',
  setRemoveCollectibleMessage = 'setRemoveCollectibleMessage',
  loadingMethodDataStarted = 'loadingMethodDataStarted',
  loadingMethodDataFinished = 'loadingMethodDataFinished',
  // Tab State
  setRequestAccountTabs = 'setRequestAccountTabs',
  setCurrentWindowTab = 'setCurrentWindowTab',
  setOpenMetamaskTabIds = 'setOpenMetamaskTabIds',
  // Smart Transactions state
  setSmartTransactionsError = 'setSmartTransactionsError',
  dismissSmartTransactionsError = 'dismissSmartTransactionsError',
  toggleCurrencyInputSwitch = 'toggleCurrencyInputSwitch',
  // Tokens state
  setPendingTokens = 'setPendingTokens',
  clearPendingTokens = 'clearPendingTokens',
  loadingTokenParamsStarted = 'loadingTokenParamsStarted',
  loadingTokenParamsFinished = 'loadingTokenParamsFinished',
  setNewTokensImported = 'setNewTokensImported',
  setCustomTokenAmount = 'setCustomTokenAmount',
  buy = 'buy',
}
