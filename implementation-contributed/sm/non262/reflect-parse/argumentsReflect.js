// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-reflect-parse-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
// Test reflect.parse on a function with arguments.length
let ast = Reflect.parse(`function f10() {
    return arguments.length;
}`);

assert.sameValue(ast.body[0].body.body[0].argument.object.type, "Identifier");
assert.sameValue(ast.body[0].body.body[0].argument.object.name, "arguments");
assert.sameValue(ast.body[0].body.body[0].argument.property.type, "Identifier");
assert.sameValue(ast.body[0].body.body[0].argument.property.name, "length");

