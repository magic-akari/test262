// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
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
 * Contributor:
 *   Jeff Walden <jwalden+code@mit.edu>
 */

var gTestfile = 'preventExtensions-cross-global.js';
//-----------------------------------------------------------------------------
var BUGNUMBER = 789897;
var summary =
  "Object.preventExtensions and Object.isExtensible should work correctly " +
  "across globals";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var otherGlobal = newGlobal();

var obj = {};
assert.sameValue(otherGlobal.Object.isExtensible(obj), true);
assert.sameValue(otherGlobal.Object.preventExtensions(obj), obj);
assert.sameValue(otherGlobal.Object.isExtensible(obj), false);

var objFromOther = otherGlobal.Object();
assert.sameValue(Object.isExtensible(objFromOther), true);
assert.sameValue(Object.preventExtensions(objFromOther), objFromOther);
assert.sameValue(Object.isExtensible(objFromOther), false);

var proxy = new Proxy({}, {});
assert.sameValue(otherGlobal.Object.isExtensible(proxy), true);
assert.sameValue(otherGlobal.Object.preventExtensions(proxy), proxy);
assert.sameValue(otherGlobal.Object.isExtensible(proxy), false);

var proxyFromOther = otherGlobal.evaluate("new Proxy({}, {})");
assert.sameValue(Object.isExtensible(proxyFromOther), true);
assert.sameValue(Object.preventExtensions(proxyFromOther), proxyFromOther);
assert.sameValue(Object.isExtensible(proxyFromOther), false);

/******************************************************************************/

print("Tests complete");
