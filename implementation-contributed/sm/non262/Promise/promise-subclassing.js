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
let results = [];

class SubPromise extends Promise {
  constructor(executor) {
    results.push('SubPromise ctor called');
    super(executor);
  }
  then(res, rej) {
    results.push('SubPromise#then called');
    return intermediatePromise = super.then(res, rej);
  }
}

let subPromise = new SubPromise(function(res, rej) {
  results.push('SubPromise ctor called executor');
  res('result');
});

let intermediatePromise;
let allSubPromise = SubPromise.all([subPromise]);

assert.sameValue(subPromise instanceof SubPromise, true);
assert.sameValue(allSubPromise instanceof SubPromise, true);
assert.sameValue(intermediatePromise instanceof SubPromise, true);

expected = [
'SubPromise ctor called',
'SubPromise ctor called executor',
'SubPromise ctor called',
'SubPromise#then called',
'SubPromise ctor called',
];

assert.sameValue(results.length, expected.length);
expected.forEach((expected,i) => assert.sameValue(results[i], expected));

subPromise.then(val=>results.push('subPromise.then with val ' + val));
allSubPromise.then(val=>results.push('allSubPromise.then with val ' + val));

expected.forEach((expected,i) => assert.sameValue(results[i], expected));
expected = expected.concat([
'SubPromise#then called',
'SubPromise ctor called',
'SubPromise#then called',
'SubPromise ctor called',
]);

assert.sameValue(results.length, expected.length);
expected.forEach((expected,i) => assert.sameValue(results[i], expected));

drainJobQueue();

expected = expected.concat([
'subPromise.then with val result',
'allSubPromise.then with val result',
]);

assert.sameValue(results.length, expected.length);

