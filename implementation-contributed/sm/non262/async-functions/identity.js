// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  needs drainJobQueue
description: |
  pending
esid: pending
---*/
var BUGNUMBER = 1185106;
var summary = "Named async function expression should get wrapped function for the name inside it";

print(BUGNUMBER + ": " + summary);

var expr = async function foo() {
  return foo;
};
assertEventuallyEq(expr(), expr);

