// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/// -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

function testBigInt(b) {
    var a = deserialize(serialize(b));
    assert.sameValue(typeof b, "bigint");
    assert.sameValue(typeof a, "bigint");
    assert.sameValue(a, b);
}

testBigInt(0n);
testBigInt(-1n);
testBigInt(1n);

testBigInt(0xffffFFFFffffFFFFffffFFFFffffFFFFn);
testBigInt(-0xffffFFFFffffFFFFffffFFFFffffFFFFn);

