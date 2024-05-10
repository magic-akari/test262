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
// Define a global getter without a setter.
Object.defineProperty(this, "x", {
  get: function () { return "get-x"; },
  configurable: true
});

// Simulate loading a 2nd script with evaluate, else we would DEFVAR the x and
// the above defineProperty would fail in trying to redefine a non-configurable
// property on the global.
evaluate(`{
  function x() { return "fun-x"; }
}`);

// Annex B is supposed to be like an assignment. Should not blow away the
// existing setter-less getter.
assert.sameValue(x, "get-x");
