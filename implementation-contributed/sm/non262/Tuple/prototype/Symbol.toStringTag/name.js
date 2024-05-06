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
var desc = Object.getOwnPropertyDescriptor(Tuple.prototype, Symbol.toStringTag);

assert.sameValue(desc.name, undefined);

