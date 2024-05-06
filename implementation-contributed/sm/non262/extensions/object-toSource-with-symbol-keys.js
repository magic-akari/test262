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

var obj = {};
obj[Symbol.iterator] = 1;
assert.sameValue(obj.toSource(), "({[Symbol.iterator]:1})");
obj[Symbol(undefined)] = 2;
obj[Symbol('ponies')] = 3;
obj[Symbol.for('ponies')] = 4;
assert.sameValue(obj.toSource(),
         '({[Symbol.iterator]:1, [Symbol()]:2, [Symbol("ponies")]:3, [Symbol.for("ponies")]:4})');

