# Confirmation Pages Structure

Currently we have following confirmation pages:

1. pages/confirm-deploy-contract
2. pages/confirm-send-ether
3. pages/confirm-send-token
4. pages/confirm-approve
5. pages/confirm-token-transaction-base
6. pages/confirm-contract-interaction
7. pages/confirm-transaction/conf-tx.js

![Confirmation Pages structure](https://raw.githubusercontent.com/MetaMask/metamask-extension/conf_structure_doc/refactoring/confirmation-page-structure/structure.png)

`confirm-page-container` component helps to define a structure for confirmation pages it includes:

1.  header 2. content - transaction details and tabs for hexdata and insights if available 3. footer 4. warnings

`confirm-transaction-base` component is responsible for looks at transaction details to build various section of confirmation page like gas-details, hex-data, etc and passing over to `confirm-page-container`.

Other confirmation components are responsible for passing over to `confirm-transaction-base` values / components specific to their confirmation method. For instance, `confirm-deploy-contract` passes data section to `confirm-transaction-base`.

Over time the components have become diluted in the concerns they handle. We need to refactor / cleanup `confirm-page-container`, `confirm-transaction-base` components to remove any transaction specific code into other components. Additionally very large components like `confirm-transaction-base` needs to be broken down into child components.
Different transaction components have lot of props passing, that should be minimised. Remove un-necessary props passing. Whereever possible use selectors to get value from state.
Repeated code requires to be moved to re-usable hooks / components.

For developers new to confirmation code it is hard to understand how components are put together. It will be nice to have some kind of documentation - a doc in the repo or comments in the code itself to guide developers.

## Areas of Refactoring:

1. Edit gas popovers: we have 2 different versions popovers for gas editing: - Legacy gas popover - [component](https://github.com/MetaMask/metamask-extension/tree/develop/ui/components/app/edit-gas-popover) - EIP-1559 V2 gas popover - [component1](https://github.com/MetaMask/metamask-extension/tree/develop/ui/components/app/edit-gas-fee-popover), [component2](https://github.com/MetaMask/metamask-extension/tree/develop/ui/components/app/advanced-gas-fee-popover)
   [transaction-modal-context](https://github.com/MetaMask/metamask-extension/blob/develop/ui/contexts/transaction-modal.js) is used to show hide EIP-1559 gas popovers.
   A parent component can be created for gas editing popover which will wrap both the legacy and IEP-1559 gas popover. Depending on the type of transaction legacy or EIP-1559 appropriate gas popover can be show. `transaction-modal-context` can be used to take care to open/close both the popovers.
   This parent component can be added to confirm-transaction-base component and thus will be available on all confirmation pages using gas editing.
2. Code cleanup in [confirm-page-container](https://github.com/MetaMask/metamask-extension/tree/03ccc5366cf31c9fa0fedc2fac533ebc64e6f2b4/ui/components/app/confirm-page-container) component:
   - Move code specific to transaction to their confirmation component, for instance code related to `ApproveForAll` should be moved to `/pages/confirm-approve`, code related to `hideTitle` can be moved to `/pages/confirm-contract-interaction` etc.
   - All header related code [here](https://github.com/MetaMask/metamask-extension/blob/03ccc5366cf31c9fa0fedc2fac533ebc64e6f2b4/ui/components/app/confirm-page-container/confirm-page-container.component.js#L191) should be moved to [confirm-page-container-header](https://github.com/MetaMask/metamask-extension/tree/03ccc5366cf31c9fa0fedc2fac533ebc64e6f2b4/ui/components/app/confirm-page-container/confirm-page-container-header)
   - All warnings related code can be moved to a new child component.
   - Props passing to `confirm-page-component` should be reduced. A lot of passed props like `origin`, `supportEIP1559` can be obtained directly using selectors. Props passing from `confirm-page-container` down to its child components should also be reduced.
   - We may also think about getting rid of `confirm-page-container`.
3. Code cleanup in [confirm-transaction-base](https://github.com/MetaMask/metamask-extension/tree/develop/ui/pages/confirm-transaction-base) component:
   `confirm-transaction-base` component is huge 1200 lines component taking care of lot of complexity.
