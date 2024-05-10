// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Promise-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
info: |
  needs setPromiseRejectionTrackerCallback
description: |
  pending
esid: pending
---*/
const UNHANDLED = 0;
const HANDLED   = 1;

let rejections = new Map();
function rejectionTracker(promise, state) {
  rejections.set(promise, state);
}
setPromiseRejectionTrackerCallback(rejectionTracker);

// If the return value of then is not used, the promise object is optimized
// away, but if a rejection happens, the rejection should be notified.
Promise.resolve().then(() => { throw 1; });
drainJobQueue();

assert.sameValue(rejections.size, 1);

let [[promise, state]] = rejections;
assert.sameValue(state, UNHANDLED);

let exc;
promise.catch(x => { exc = x; });
drainJobQueue();

// we handled it after all
assert.sameValue(rejections.get(promise), HANDLED);

// the right exception was reported
assert.sameValue(exc, 1);

if (this.assert.sameValue) {
}
