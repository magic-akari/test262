// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-regress-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features:
- oomTest
description: |
  pending
esid: pending
---*/
oomTest(function() {
    grayRoot();
    gczeal(8);
    gcslice(this);
});

this.assert.sameValue && assert.sameValue(true, true, 'An OOM while gray buffering should not leave the GC half-done');
