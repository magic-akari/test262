// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  needs evaluate()
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

// Check references to someVar, both as a variable and on |this|, in
// various evaluation contexts.
var someVar = 1;

// Top level.
assert.sameValue(someVar, 1);
assert.sameValue(this.someVar, 1);

// Inside evaluate.
evaluate("assert.sameValue(someVar, 1);");
evaluate("assert.sameValue(this.someVar, 1);");

// With an object on the scope, no shadowing.
var someObject = { someOtherField: 2 };
var evalOpt = { envChainObject: someObject };
evaluate("assert.sameValue(someVar, 1);", evalOpt);
evaluate("assert.sameValue(this.someVar, undefined);", evalOpt);

// With an object on the scope, shadowing global.
someObject = { someVar: 2 };
evalOpt = { envChainObject: someObject };
var alsoSomeObject = someObject;
evaluate("assert.sameValue(someVar, 2);", evalOpt);
evaluate("assert.sameValue(this.someVar, 2);", evalOpt);
evaluate("assert.sameValue(this, alsoSomeObject);", evalOpt);

// With an object on the scope, inside a function.
evaluate("(function() { assert.sameValue(someVar, 2);})()", evalOpt);
evaluate("(function() { assert.sameValue(this !== alsoSomeObject, true);})()", evalOpt);
evaluate("(function() { assert.sameValue(this.someVar, 1);})()", evalOpt);

// `this` is ShellWindowProxy instead of GlobalObject, and it's allowed.
evaluate("assert.sameValue(someVar, 1);", { envChainObject: this });

