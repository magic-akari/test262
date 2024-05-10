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
  needs drainJobQueue
description: |
  pending
esid: pending
---*/
// Resolve Promise with itself by directly calling the "Promise Resolve Function".
let resolve;
let promise = new Promise(function(x) { resolve = x; });
resolve(promise)

let results = [];
promise.then(res => assert.sameValue(true, false, "not reached")).catch(res => {
    assert.sameValue(res instanceof TypeError, true);
    results.push("rejected");
});

drainJobQueue()

assert.sameValue(results.length, 1);
assert.sameValue(results[0], "rejected");


// Resolve Promise with itself when the "Promise Resolve Function" is called
// from (the fast path in) PromiseReactionJob.
results = [];

promise = new Promise(x => { resolve = x; });
let promise2 = promise.then(() => promise2);

promise2.then(() => assert.sameValue(true, false, "not reached"), res => {
    assert.sameValue(res instanceof TypeError, true);
    results.push("rejected");
});

resolve();

drainJobQueue();

assert.sameValue(results.length, 1);
assert.sameValue(results[0], "rejected");


