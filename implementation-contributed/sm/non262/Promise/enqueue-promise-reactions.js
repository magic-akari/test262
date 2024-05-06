// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  needs getSelfHostedValue and drainJobQueue
description: |
  pending
esid: pending
---*/
function onResolved(val) {
    result = 'resolved with ' + val;
}

function onRejected(val) {
    result = 'rejected with ' + val;
}

// Replacing `Promise#then` shouldn't affect addPromiseReactions.
Promise.prototype.then = 1;

// Replacing Promise@@species shouldn't affect addPromiseReactions.
Object.defineProperty(Promise, Symbol.species, { get: function(){} });

// Replacing `Promise` shouldn't affect addPromiseReactions.
let PromiseCtor = Promise;
Promise = {};

let result;
let res;
let rej;
let p = new PromiseCtor(function(res_, rej_) { res = res_; rej = rej_; });

addPromiseReactions(p, onResolved, onRejected);
res('foo');
drainJobQueue();
assert.sameValue(result, 'resolved with foo')

p = new PromiseCtor(function(res_, rej_) { res = res_; rej = rej_; });

addPromiseReactions(p, onResolved, onRejected);
rej('bar');
drainJobQueue();
assert.sameValue(result, 'rejected with bar');

