// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-module-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
info: |
  needs drainJobQueue
description: |
  pending
esid: pending
---*/
async function test() {
  try {
    await import("./bug1689499-a.js");
    throw new Error("import should have failed");
  } catch (exc) {
    assert.sameValue(exc.message, "FAIL");
  }

  try {
    await import("./bug1689499-x.js");
    throw new Error("import should have failed");
  } catch (exc) {
    assert.sameValue(exc.message, "FAIL");
  }

}

test();
drainJobQueue();
