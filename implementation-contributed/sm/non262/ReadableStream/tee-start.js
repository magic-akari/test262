// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/// stream.tee() shouldn't try to call a .start() method.

Object.prototype.start = function () { throw "FAIL"; };
let source = Object.create(null);
new ReadableStream(source).tee();

drainJobQueue();

if (typeof assert.sameValue == 'function')
