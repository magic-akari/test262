// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: |
  Return false if fromIndex >= TupleLength
flags:
- noStrict
features:
- Tuple
esid: pending
---*/

var sample = #[7, 7, 7, 7];
assert.sameValue(sample.includes(7, 4), false, "length");
assert.sameValue(sample.includes(7, 5), false, "length + 1");

