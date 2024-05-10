// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
var sr = new ShadowRealm();

var id = sr.evaluate(`x => x()`);

// |id| is a Function from the current realm and _not_ from ShadowRealm.
assert.sameValue(id instanceof Function, true);

function f() {
  return 1;
}

// Smoke test: Ensure calling |f| through the ShadowRealm works correctly.
assert.sameValue(id(f), 1);

// Add an accessor for "name" which throws. This will lead to throwing an
// exception in CopyNameAndLength. The thrown exception should be from the
// realm of |id|, i.e. the current realm.
Object.defineProperty(f, "name", {
  get() { throw new Error; }
});

assertThrowsInstanceOf(() => id(f), TypeError);

