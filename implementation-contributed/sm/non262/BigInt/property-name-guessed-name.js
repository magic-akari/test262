// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
// BigInts currently don't participate when computing guessed function names.

var p = {};
p[1] = function(){};
p[2n] = function(){};

assert.sameValue(displayName(p[1]), "p[1]");
assert.sameValue(displayName(p[2]), "");

var q = {
  1: [function(){}],
  2n: [function(){}],
};

assert.sameValue(displayName(q[1][0]), "q[1]<");
assert.sameValue(displayName(q[2][0]), "q<");

