// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
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

var gTestfile = 'function-bind.js';
var BUGNUMBER = 429507;
var summary = "ES5: Function.prototype.bind";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

assert.sameValue((function unbound(){"body"}).bind().toSource(), `function bound() {
    [native code]
}`);

assert.sameValue(uneval((function unbound(){"body"}).bind()), `function bound() {
    [native code]
}`);


/******************************************************************************/

print("All tests passed!");
