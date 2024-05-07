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
var summary = "arguments.callee in sloppy mode should return wrapped function";

print(BUGNUMBER + ": " + summary);

async function decl1() {
  return arguments.callee;
}
assertEventuallyEq(decl1(), decl1);

var expr1 = async function foo() {
  return arguments.callee;
};
assertEventuallyEq(expr1(), expr1);

var expr2 = async function() {
  return arguments.callee;
};
assertEventuallyEq(expr2(), expr2);

var obj = {
  async method1() {
    return arguments.callee;
  }
};
assertEventuallyEq(obj.method1(), obj.method1);

