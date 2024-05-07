// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
- deepEqual.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
var ta = new Int32Array([3, 2, 1]);

detachArrayBuffer(ta.buffer);

assertThrowsInstanceOf(() => ta.toSorted(), TypeError);

