// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

//-----------------------------------------------------------------------------
var BUGNUMBER = 653789;
var summary = 'Check for too-deep stack when calling toLocaleString';

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

try
{
  "" + { toString: Object.prototype.toLocaleString };
  throw new Error("should have thrown on over-recursion");
}
catch (e)
{
  assert.sameValue(e instanceof InternalError, true);
}

/******************************************************************************/

print("All tests passed!");
