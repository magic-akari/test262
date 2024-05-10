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
  needs newGlobal()
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

//-----------------------------------------------------------------------------
var BUGNUMBER = 770344;
var summary = "Object.getPrototypeOf behavior across compartments";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var other = newGlobal();

var getProto = Object.getPrototypeOf;
var otherGetProto = other.Object.getPrototypeOf;

var proto = {};
var obj = Object.create(proto);
assert.sameValue(getProto(obj), proto);
assert.sameValue(otherGetProto(obj), proto);

other.proto = proto;
var otherObj = other.evaluate("Object.create(proto)");
assert.sameValue(getProto(otherObj), proto);
assert.sameValue(otherGetProto(otherObj), proto);

var p = other.evaluate("({})");
var objOtherProto = Object.create(p);
assert.sameValue(getProto(objOtherProto), p);
assert.sameValue(otherGetProto(objOtherProto), p);

other.evaluate("var otherProto = { otherProto: 1 }; " +
               "var otherObj = Object.create(otherProto);");
assert.sameValue(getProto(other.otherObj), other.otherProto);
assert.sameValue(otherGetProto(other.otherObj), other.otherProto);

other.evaluate("var newOtherProto = { newOtherProto: 1 }; " +
               "otherObj.__proto__ = newOtherProto;");
assert.sameValue(otherGetProto(other.otherObj), other.newOtherProto);

// TODO This assertion fails due to bug 764307
//assert.sameValue(getProto(other.otherObj), other.newOtherProto);


/******************************************************************************/

print("Tests complete");
