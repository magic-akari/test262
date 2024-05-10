// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-async-functions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/var BUGNUMBER = 1185106;
var summary = "Bound names of async functions";

print(BUGNUMBER + ": " + summary);

async function test() {}
assert.sameValue(test.name, "test");

var test2 = (async function test2() {});
assert.sameValue(test2.name, "test2");

var anon = async function() {};
assert.sameValue(anon.name, "anon");

if (typeof Reflect !== "undefined" && Reflect.parse) {
  var tree = Reflect.parse("export default async function() {}", { target: "module" });
  assert.sameValue(tree.body[0].declaration.id.name, "default");
}

