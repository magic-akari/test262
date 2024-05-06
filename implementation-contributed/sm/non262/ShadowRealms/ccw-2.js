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
var g = newGlobal({newCompartment: true});

var sr = new ShadowRealm();

var f = sr.evaluate(`
  var wrappedCCW;
  (f => { wrappedCCW = f; });
`);

f(g.evaluate(`x => x()`));

var h = sr.evaluate(`
  // Pass an object from the ShadowRealm's compartment to the CCW function.
  wrappedCCW(() => { return "ok"; })
`);

assert.sameValue(h, "ok");

