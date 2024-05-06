// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: |
  Tuple.prototype.indexOf returns 0 if fromIndex is 'undefined'
flags:
- noStrict
features:
- Tuple
esid: pending
---*/

var a = #[1, 2, 3];

// undefined resolves to 0
assert.sameValue(a.indexOf(1, undefined), 0, 'a.indexOf(1,undefined)');

