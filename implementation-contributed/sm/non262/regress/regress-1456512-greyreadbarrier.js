// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-regress-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
info: |
  needs grayRoot
description: |
  pending
esid: pending
---*/
var wm = new WeakMap();
grayRoot().map = wm;
wm = null;
gczeal(13, 7);
var lfOffThreadGlobal = newGlobal();

assert.sameValue('do not crash', 'do not crash', 'did not crash!');
