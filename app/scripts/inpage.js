// need to make sure we aren't affected by overlapping namespaces
// and that we dont affect the app with our namespace
// mostly a fix for web3's BigNumber if AMD's "define" is defined...
let __define;

/**
 * Caches reference to global define object and deletes it to
 * avoid conflicts with other global define objects, such as
 * AMD's define function
 */
const cleanContextForImports = () => {
  __define = global.define;
  try {
    global.define = undefined;
  } catch (_) {
    console.warn('MetaMask - global.define could not be deleted.');
  }
};

/**
 * Restores global define object from cached reference
 */
const restoreContextAfterImports = () => {
  try {
    global.define = __define;
  } catch (_) {
    console.warn('MetaMask - global.define could not be overwritten.');
  }
};

cleanContextForImports();

/* eslint-disable import/first */
import log from 'loglevel';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { initializeProvider } from '@metamask/providers/dist/initializeInpageProvider';
import shouldInjectProvider from '../../shared/modules/provider-injection';

// contexts
const CONTENT_SCRIPT = 'metamask-contentscript';
const INPAGE = 'metamask-inpage';

const IGNORE_METHODS = [
  'eth_chainId',
  'eth_getBlockByNumber',
  'metamask_chainChanged',
  'metamask_sendDomainMetadata',
  'metamask_unlockStateChanged',
];

restoreContextAfterImports();

log.setDefaultLevel(process.env.METAMASK_DEBUG ? 'debug' : 'warn');

//
// setup plugin communication
//

if (shouldInjectProvider()) {
  // setup background connection
  const metamaskStream = new WindowPostMessageStream({
    name: INPAGE,
    target: CONTENT_SCRIPT,
  });

  initializeProvider({
    connectionStream: metamaskStream,
    logger: log,
    shouldShimWeb3: true,
  });

  metamaskStream.on('data', (chunk) => {
    const method = chunk.data?.method;

    if (IGNORE_METHODS.includes(method)) {
      return;
    }

    console.info(
      `metamaskStream > ${chunk.name} > method: ${method} | chunk id: ${chunk.id} | params: `,
      chunk.data?.params,
    );
  });

  metamaskStream.on('message', (msg) => {
    console.log('Received message:', msg);
  });

  metamaskStream.on('readable', (msg) => {
    console.log('Received readable:', msg);
  });

  console.log('inpage inject');

  // extensionStream.on('data', (chunk) => {
  //   const method = chunk.data?.method || chunk.method;
  //   const chunkId = chunk.data?.id || chunk.id;

  //   if (IGNORE_METHODS.includes(method)) {
  //     return;
  //   }

  //   console.info(
  //     `extensionStream > ${chunk.name} | method: ${method} | chunk id: ${chunkId} | chunk data: `,
  //     chunk.data,
  //   );
  // });
}
