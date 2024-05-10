// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Number-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * https://creativecommons.org/publicdomain/zero/1.0/
 */

assert.sameValue(Number("0b11"), 3);
assert.sameValue(Number("0B11"), 3);
assert.sameValue(Number(" 0b11 "), 3);
assert.sameValue(Number("0b12"), NaN);
assert.sameValue(Number("-0b11"), NaN);
assert.sameValue(+"0b11", 3);

assert.sameValue(Number("0o66"), 54);
assert.sameValue(Number("0O66"), 54);
assert.sameValue(Number(" 0o66 "), 54);
assert.sameValue(Number("0o88"), NaN);
assert.sameValue(Number("-0o66"), NaN);
assert.sameValue(+"0o66", 54);

if(typeof getSelfHostedValue === "function"){
    assert.sameValue(getSelfHostedValue("ToNumber")("0b11"), 3);
    assert.sameValue(getSelfHostedValue("ToNumber")("0o66"), 54);
}

