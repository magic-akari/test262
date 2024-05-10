// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-object-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
info: |
  uses evalcx
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

try {
    evalcx("Object.freeze(this); eval('const q = undefined;')");
} catch (e) {
    assert.sameValue(e.message, "({lazy:false}) is not extensible");
}

assert.sameValue(0, 0, "don't crash");
