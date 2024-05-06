// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

if ("evalcx" in this) {
  var sandbox = evalcx("");
  var obj = { get foo() { throw("FAIL"); } };
  var getter = obj.__lookupGetter__("foo");
  var desc = sandbox.Object.getOwnPropertyDescriptor(obj, "foo");
  assert.sameValue(desc.get, getter, "getter is correct");
  assert.sameValue(desc.set, undefined, "setter is correct");
}
else {
}
