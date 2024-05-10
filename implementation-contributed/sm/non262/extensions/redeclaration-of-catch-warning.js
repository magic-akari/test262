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
---*///
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

//-----------------------------------------------------------------------------
var BUGNUMBER = 622646;
var summary = "Shadowing an exception identifier in a catch block with a " +
              "|const| or |let| declaration should throw an error";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

function assertRedeclarationErrorThrown(expression)
{
  "use strict";

  try
  {
    evaluate(expression);
    throw new Error("Redeclaration error wasn't thrown");
  }
  catch(e)
  {
    assert.sameValue(e.message.indexOf("catch") > 0, true,
             "wrong error, got " + e.message);
  }
}

assertRedeclarationErrorThrown("try {} catch(e) { const e = undefined; }");
assertRedeclarationErrorThrown("try {} catch(e) { let e; }");

