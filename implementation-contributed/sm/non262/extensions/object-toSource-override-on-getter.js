// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*//* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/ */

let x = {};
let y = function() {};
y.toSource = function() {
    return "[012345678901234567890123456789]";
};
Object.defineProperty(x, "", {enumerable: true, get: y});
assert.sameValue(x.toSource(), "({'':[012345678901234567890123456789]})");

