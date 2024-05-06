// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
description: |
  pending
esid: pending
---*/var BUGNUMBER = 1391519;
var summary = "for-await-of outside of async function should provide better error";

print(BUGNUMBER + ": " + summary);

let caught = false;
try {
    eval("for await (let x of []) {}");
} catch(e) {
    assert.sameValue(e.message.includes("for await (... of ...) is only valid in"), true);
    caught = true;
}
assert.sameValue(caught, true);

// Extra `await` shouldn't throw that error.
caught = false;
try {
    eval("async function f() { for await await (let x of []) {} }");
} catch(e) {
    assert.sameValue(e.message, "missing ( after for");
    caught = true;
}
assert.sameValue(caught, true);

