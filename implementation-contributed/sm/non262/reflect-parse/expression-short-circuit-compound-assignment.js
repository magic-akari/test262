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
function test() {

assertExpr("(x ??= y)", aExpr("??=", ident("x"), ident("y")));
assertExpr("(x ||= y)", aExpr("||=", ident("x"), ident("y")));
assertExpr("(x &&= y)", aExpr("&&=", ident("x"), ident("y")));

}

runtest(test);
