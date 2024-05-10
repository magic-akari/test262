// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-ReadableStream-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
// 3.5.6. ReadableStreamError ( stream, e ) nothrow
//
// 9. Reject reader.[[closedPromise]] with e.
// 10. Set reader.[[closedPromise]].[[PromiseIsHandled]] to true.
//
// Rejection for [[closedPromise]] shouldn't be reported as unhandled.

const rs = new ReadableStream({
  start() {
    return Promise.reject(new Error("test"));
  }
});

let rejected = false;
rs.getReader().read().then(() => {}, () => { rejected = true; });

drainJobQueue();

assert.sameValue(rejected, true);

if (typeof assert.sameValue === 'function') {
}

// Shell itself reports unhandled rejection if there's any.
