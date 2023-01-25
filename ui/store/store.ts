import { StoreEnhancer } from 'redux';
import { configureStore as baseConfigureStore } from '@reduxjs/toolkit';
import devtoolsEnhancer from 'remote-redux-devtools';
import rootReducer from '../ducks';

export default function configureStore(preloadedState: any) {
  const debugModeEnabled = Boolean(process.env.METAMASK_DEBUG);
  const isDev = debugModeEnabled && !process.env.IN_TEST;
  const enhancers: StoreEnhancer[] = [];

  if (isDev) {
    enhancers.push(
      devtoolsEnhancer({
        name: 'MetaMask',
        hostname: 'localhost',
        port: 8000,
        realtime: true,
      }),
    );
  }

  // return createStore(rootReducer, initialState, storeEnhancers);
  return baseConfigureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        /**
         * We do not persist the redux tree for rehydration, so checking for
         * serializable state keys is not relevant for now. Any state that persists
         * is managed in the background. We may at some point want this, but we can
         * gradually implement by using the ignore options to ignore those actions
         * and state keys that are not serializable, preventing us from adding new
         * actions and state that would violate our ability to persist state keys.
         * NOTE: redux-thunk is included by default in the middleware below.
         */
        serializableCheck: false,
        /**
         * immutableCheck controls whether we get warnings about mutation of
         * state, which will be true in dev. However in test lavamoat complains
         * about something the middleware is doing. It would be good to figure
         * that out and enable this in test environments so that mutation
         * causes E2E failures.
         */
        immutableCheck: isDev
          ? {
              warnAfter: 100,
            }
          : false,
      }),
    devTools: false,
    enhancers,
    preloadedState,
  });
}

type Store = ReturnType<typeof configureStore>;
export type MetaMaskReduxState = ReturnType<Store['getState']>;
export type MetaMaskReduxDispatch = Store['dispatch'];
