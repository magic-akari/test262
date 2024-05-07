// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- module
- noStrict
features: []
negative:
  phase: early
  type: SyntaxError
description: |
  pending
esid: pending
---*/
// 'await' is always a keyword when parsing modules.
function f() {
    await;
}
