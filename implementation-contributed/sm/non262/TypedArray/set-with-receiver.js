// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
- compareArray.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/for (var constructor of anyTypedArrayConstructors) {
    var receiver = {};

    var ta = new constructor(1);
    assert.sameValue(Reflect.set(ta, 0, 47, receiver), true);
    assert.sameValue(ta[0], 0);
    assert.sameValue(receiver[0], 47);

    // Out-of-bounds
    assert.sameValue(Reflect.set(ta, 10, 47, receiver), true);
    assert.sameValue(ta[10], undefined);
    assert.sameValue(receiver[10], 47);

    // Detached
    if (typeof detachArrayBuffer === "function" &&
        !isSharedConstructor(constructor))
    {
        detachArrayBuffer(ta.buffer)

        assert.sameValue(ta[0], undefined);
        assert.sameValue(Reflect.set(ta, 0, 42, receiver), true);
        assert.sameValue(ta[0], undefined);
        assert.sameValue(receiver[0], 42);
    }
}

