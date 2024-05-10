// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-regress-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/if (typeof 'evalInWorder' == 'function') {
    evalInWorker(`
  addMarkObservers([grayRoot(), grayRoot().x, this, Object.create(null)]);
`);
}

assert.sameValue('do not crash', 'do not crash', 'did not crash!');
