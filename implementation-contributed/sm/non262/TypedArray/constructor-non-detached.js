// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
- compareArray.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/for (var constructor of typedArrayConstructors) {
    var buf = new constructor();
    detachArrayBuffer(buf.buffer);
    assertThrowsInstanceOf(() => new constructor(buf), TypeError);

    var buffer = new ArrayBuffer();
    detachArrayBuffer(buffer);
    assertThrowsInstanceOf(() => new constructor(buffer), TypeError);
}


