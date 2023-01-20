import freeze from 'deep-freeze-strict';
import reducers from '../../ducks';
import { NETWORK_TYPES } from '../../../shared/constants/network';
import { ActionConstants } from './actions';

describe('Redux ActionConstants', () => {
  describe('setRpcTarget', () => {
    const initialState = {
      metamask: {
        frequentRpcList: [],
        provider: {
          rpcUrl: 'bar',
        },
      },
      appState: {
        currentView: {
          name: 'accounts',
        },
      },
    };
    freeze(initialState);
    it('sets the state.metamask.rpcUrl property of the state to the action.value', () => {
      const action = {
        type: ActionConstants.setRpcTarget,
        value: 'foo',
      };

      const result = reducers(initialState, action);
      expect(result.metamask.provider.type).toStrictEqual(NETWORK_TYPES.RPC);
      expect(result.metamask.provider.rpcUrl).toStrictEqual('foo');
    });
  });

  describe('setAccountLabel', () => {
    it('updates the state.metamask.identities[:i].name property of the state to the action.value.label', () => {
      const initialState = {
        metamask: {
          identities: {
            foo: {
              name: 'bar',
            },
          },
        },
      };
      freeze(initialState);

      const action = {
        type: ActionConstants.setAccountLabel,
        value: {
          account: 'foo',
          label: 'baz',
        },
      };
      freeze(action);

      const resultingState = reducers(initialState, action);
      expect(resultingState.metamask.identities.foo.name).toStrictEqual(
        action.value.label,
      );
    });
  });

  describe('showAccountDetail', () => {
    it('updates metamask state', () => {
      const initialState = {
        metamask: {},
      };
      freeze(initialState);

      const action = {
        type: ActionConstants.showAccountDetail,
        value: 'bar',
      };
      freeze(action);

      const resultingState = reducers(initialState, action);
      expect(resultingState.metamask.isUnlocked).toStrictEqual(true);
      expect(resultingState.metamask.isInitialized).toStrictEqual(true);
    });
  });
});
