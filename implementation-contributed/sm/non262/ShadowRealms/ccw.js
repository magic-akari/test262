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
var g = newGlobal({ newCompartment: true });

var sr = g.evaluate(`new ShadowRealm()`);


// sr should be a CCW to a ShadowRealm.
ShadowRealm.prototype.evaluate.call(sr, "var x = 10");
assert.sameValue(sr.evaluate("x"), 10);

// wrappedf should *not* be a CCW, because we're using this realm's ShadowRealm.prototype.evaluate,
// and so the active realm when invoking will be this current realm.
//
// However, the target function (wrappedf's f)  comes from another compartment, and will have to be a CCW.
var wrappedf = ShadowRealm.prototype.evaluate.call(sr, "function f() { return 10; }; f");
assert.sameValue(wrappedf(), 10);

var evaluate_from_other_realm = g.evaluate('ShadowRealm.prototype.evaluate');

// wrappedb should be a CCW, since the callee of the .call comes from the other
// compartment.
var wrappedb = evaluate_from_other_realm.call(sr, "function b() { return 12; }; b");
assert.sameValue(wrappedb(), 12);

nukeAllCCWs()
// This throws, but the dead object message is lost and replaced with the wrapped function
// object message.
assertThrowsInstanceOf(() => wrappedf(), TypeError);
assertThrowsInstanceOf(() => wrappedb(), TypeError);

