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
var BUGNUMBER = 1335025;
var summary = "(non-standard) async function toSource";

print(BUGNUMBER + ": " + summary);

async function f1(a, b, c) { await a; }

assert.sameValue(f1.toSource(),
         "async function f1(a, b, c) { await a; }");

assert.sameValue(async function (a, b, c) { await a; }.toSource(),
         "(async function (a, b, c) { await a; })");

assert.sameValue((async (a, b, c) => await a).toSource(),
         "async (a, b, c) => await a");

assert.sameValue((async (a, b, c) => { await a; }).toSource(),
         "async (a, b, c) => { await a; }");

assert.sameValue({ async foo(a, b, c) { await a; } }.foo.toSource(),
         "async foo(a, b, c) { await a; }");

