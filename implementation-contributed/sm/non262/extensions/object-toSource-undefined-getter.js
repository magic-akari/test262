// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/ */

var desc = { get: undefined, set: undefined, configurable: true, enumerable: true };
var obj = Object.defineProperty({}, "prop", desc);
assert.sameValue(obj.toSource(), "({})");

