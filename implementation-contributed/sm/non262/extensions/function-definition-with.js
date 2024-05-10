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
info: |
  needs evaluate()
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

//-----------------------------------------------------------------------------
var BUGNUMBER = 577325;
var summary = 'Implement the ES5 algorithm for processing function statements';

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var called, obj;

function inFile1() { return "in file"; }
called = false;
obj = { set inFile1(v) { called = true; } };
with (obj) {
  function inFile1() { return "in file in with"; };
}
assert.sameValue(inFile1(), "in file in with");
assert.sameValue("set" in Object.getOwnPropertyDescriptor(obj, "inFile1"), true);
assert.sameValue(called, false);

evaluate("function notInFile1() { return 'not in file'; }");
called = false;
obj = { set notInFile1(v) { called = true; return "not in file 2"; } };
with (obj) {
  function notInFile1() { return "not in file in with"; };
}
assert.sameValue(notInFile1(), "not in file in with");
assert.sameValue("set" in Object.getOwnPropertyDescriptor(obj, "notInFile1"), true);
assert.sameValue(called, false);

function inFile2() { return "in file 1"; }
called = false;
obj =
  Object.defineProperty({}, "inFile2",
                        { value: 42, configurable: false, enumerable: false });
with (obj) {
  function inFile2() { return "in file 2"; };
}
assert.sameValue(inFile2(), "in file 2");
assert.sameValue(obj.inFile2, 42);


/******************************************************************************/

print("All tests passed!");
