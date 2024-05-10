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

//-----------------------------------------------------------------------------
var BUGNUMBER = 650574;
var summary = 'Check for too-deep stack when converting a value to source';

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

try
{
  var e = Error('');
  e.fileName = e;
  e.toSource();
  throw new Error("should have thrown");
}
catch (e)
{
  assert.sameValue(e instanceof InternalError, true,
           "should have thrown for over-recursion");
}

/******************************************************************************/

print("All tests passed!");
