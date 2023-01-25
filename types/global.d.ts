/* eslint-disable no-var */
// no-var is purposefully disabled because globalThis does not pick up const
// or let for some reason.
// https://stackoverflow.com/questions/35074713/extending-typescript-global-object-in-node-js
declare global {
  var platform: {
    openTab: ({ url: string }) => void;
    closeCurrentWindow: () => void;
  };
}

export {};
