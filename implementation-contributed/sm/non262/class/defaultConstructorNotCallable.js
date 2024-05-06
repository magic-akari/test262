// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/class badBase {}
assertThrowsInstanceOf(badBase, TypeError);

class badSub extends (class {}) {}
assertThrowsInstanceOf(badSub, TypeError);

