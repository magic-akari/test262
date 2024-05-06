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
var BUGNUMBER = 1331009;
var summary = "Newline is allowed between await and operand";

print(BUGNUMBER + ": " + summary);

var expr = async function foo() {
    return await
    10;
};
assertEventuallyEq(expr(), 10);

