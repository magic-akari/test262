// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Tuple-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features:
- Tuple
description: |
  pending
esid: pending
---*/
Reflect.parse("#[]");
Reflect.parse("#[ foo ]");
Reflect.parse("#[ foo, ]");
Reflect.parse("#[ foo, bar ]");
Reflect.parse("#[ foo, ...bar ]");
Reflect.parse("#[ foo, ...bar, ]");
Reflect.parse("#[ foo, ...bar, baz ]");
Reflect.parse("#[ foo() ]");

assertThrowsInstanceOf(() => Reflect.parse("#[,]"), SyntaxError);
assertThrowsInstanceOf(() => Reflect.parse("#[ foo, , bar ]"), SyntaxError);
assertThrowsInstanceOf(() => Reflect.parse("#[ foo ] = bar"), SyntaxError);

