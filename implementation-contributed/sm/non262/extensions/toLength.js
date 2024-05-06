// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/var BUGNUMBER = 1040196;
var summary = 'ToLength';

print(BUGNUMBER + ": " + summary);

var ToLength = getSelfHostedValue('ToLength');

// Negative operands
assert.sameValue(ToLength(-0), 0);
assert.sameValue(ToLength(-1), 0);
assert.sameValue(ToLength(-2), 0);
assert.sameValue(ToLength(-1 * Math.pow(2, 56)), 0);
assert.sameValue(ToLength(-1 * Math.pow(2, 56) - 2), 0);
assert.sameValue(ToLength(-1 * Math.pow(2, 56) - 2.4444), 0);
assert.sameValue(ToLength(-Infinity), 0);

// Small non-negative operands
assert.sameValue(ToLength(0), 0);
assert.sameValue(ToLength(1), 1);
assert.sameValue(ToLength(2), 2);
assert.sameValue(ToLength(3.3), 3);
assert.sameValue(ToLength(10/3), 3);

// Large non-negative operands
var maxLength = Math.pow(2, 53) - 1;
assert.sameValue(ToLength(maxLength - 1), maxLength - 1);
assert.sameValue(ToLength(maxLength - 0.0000001), maxLength);
assert.sameValue(ToLength(maxLength), maxLength);
assert.sameValue(ToLength(maxLength + 0.00000000000001), maxLength);
assert.sameValue(ToLength(maxLength + 1), maxLength);
assert.sameValue(ToLength(maxLength + 2), maxLength);
assert.sameValue(ToLength(Math.pow(2,54)), maxLength);
assert.sameValue(ToLength(Math.pow(2,64)), maxLength);
assert.sameValue(ToLength(Infinity), maxLength);

// NaN operand
assert.sameValue(ToLength(NaN), 0);


