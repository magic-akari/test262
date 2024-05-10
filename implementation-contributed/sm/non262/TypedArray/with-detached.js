// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- detachArrayBuffer.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
var ta = new Int32Array([3, 2, 1]);

$DETACHBUFFER(ta.buffer);

assertThrowsInstanceOf(() => ta.with(0, 0), TypeError);

