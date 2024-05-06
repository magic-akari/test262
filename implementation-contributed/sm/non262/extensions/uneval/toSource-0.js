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
/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
 
assert.sameValue(eval(uneval('\x001')), '\x001');

f = eval('(' + (function () { return '\x001'; }).toString() + ')');
assert.sameValue(f(), '\x001');

assert.sameValue(eval('\x001'.toSource()) == '\x001', true);

