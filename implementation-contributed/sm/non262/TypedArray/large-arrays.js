// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-TypedArray-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
// Test that we can access TypedArrays beyond the 4GB mark, if large buffers are
// supported.

const gb = 1024 * 1024 * 1024;

if (largeArrayBufferSupported()) {
    for (let TA of typedArrayConstructors) {
        let ta = new TA(6*gb / TA.BYTES_PER_ELEMENT);

        // Set element at the 5GB mark
        ta[5*gb / TA.BYTES_PER_ELEMENT] = 37;

        // Check that it was set
        assert.sameValue(ta[5*gb / TA.BYTES_PER_ELEMENT], 37);

        // Check that we're not operating mod 4GB
        assert.sameValue(ta[1*gb / TA.BYTES_PER_ELEMENT], 0);
    }
}

