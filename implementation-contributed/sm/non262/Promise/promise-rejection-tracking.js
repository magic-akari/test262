// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
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

// Unhandled rejections are tracked.
let reject;
let p = new Promise((res_, rej_) => (reject = rej_));
assert.sameValue(rejections.has(p), false);
reject('reason');
assert.sameValue(rejections.get(p), UNHANDLED);
// Later handling updates the tracking.
p.then(_=>_, _=>_);
assert.sameValue(rejections.get(p), HANDLED);

rejections.clear();

// Handled rejections aren't tracked at all.
p = new Promise((res_, rej_) => (reject = rej_));
assert.sameValue(rejections.has(p), false);
p.then(_=>_, _=>_);
reject('reason');
assert.sameValue(rejections.has(p), false);

