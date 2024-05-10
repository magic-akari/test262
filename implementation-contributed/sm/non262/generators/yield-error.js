// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-generators-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/var BUGNUMBER = 1384299;
var summary = "yield outside of generators should provide better error";

print(BUGNUMBER + ": " + summary);

let caught = false;
try {
    eval("yield 10");
} catch(e) {
    assert.sameValue(e.message, "yield expression is only valid in generators");
    caught = true;
}
assert.sameValue(caught, true);

try {
    eval("function f() { yield 10; }");
} catch(e) {
    assert.sameValue(e.message, "yield expression is only valid in generators");
    caught = true;
}
assert.sameValue(caught, true);

try {
    eval("async function f() { yield 10; }");
} catch(e) {
    assert.sameValue(e.message, "yield expression is only valid in generators");
    caught = true;
}
assert.sameValue(caught, true);

