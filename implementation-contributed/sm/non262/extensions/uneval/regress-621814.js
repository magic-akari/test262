// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
var expect = 'pass';
var actual = expect;
function f({"\xF51F": x}) {}
try {
    eval(uneval(f));
} catch (e) {
    actual = '' + e;
}
assert.sameValue(expect, actual, "");
