// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features:
- Tuple
description: |
  pending
esid: pending
---*/
assert.sameValue(isConstructor(Tuple.of), false);

assertThrowsInstanceOf(() => {
  new Tuple.of(1, 2, 3);
}, TypeError, '`new Tuple.of(1, 2, 3)` throws TypeError');

