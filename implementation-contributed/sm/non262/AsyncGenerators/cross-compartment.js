// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-AsyncGenerators-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/var g = newGlobal();
g.mainGlobal = this;

if (typeof isSameCompartment !== "function") {
  var isSameCompartment = SpecialPowers.Cu.getJSTestingFunctions().isSameCompartment;
}

var next = async function*(){}.prototype.next;

var f = g.eval(`(async function*() {
  var x = yield {message: "yield"};

  // Input completion values are correctly wrapped into |f|'s compartment.
  assert.sameValue(isSameCompartment(x, mainGlobal), true);
  assert.sameValue(x.message, "continue");

  return {message: "return"};
})`);

var it = f();

// The async iterator is same-compartment with |f|.
assert.sameValue(isSameCompartment(it, f), true);

var p1 = next.call(it, {message: "initial yield"});

// The promise object is same-compartment with |f|.
assert.sameValue(isSameCompartment(p1, f), true);

// Note: This doesn't follow the spec, which requires that only |p1 instanceof Promise| is true.
assert.sameValue(p1 instanceof Promise || p1 instanceof g.Promise, true);

p1.then(v => {
  // The iterator result object is same-compartment with |f|.
  assert.sameValue(isSameCompartment(v, f), true);
  assert.sameValue(v.done, false);

  assert.sameValue(isSameCompartment(v.value, f), true);
  assert.sameValue(v.value.message, "yield");
});

var p2 = next.call(it, {message: "continue"});

// The promise object is same-compartment with |f|.
assert.sameValue(isSameCompartment(p2, f), true);

// Note: This doesn't follow the spec, which requires that only |p2 instanceof Promise| is true.
assert.sameValue(p2 instanceof Promise || p2 instanceof g.Promise, true);

p2.then(v => {
  // The iterator result object is same-compartment with |f|.
  assert.sameValue(isSameCompartment(v, f), true);
  assert.sameValue(v.done, true);

  assert.sameValue(isSameCompartment(v.value, f), true);
  assert.sameValue(v.value.message, "return");
});

var p3 = next.call(it, {message: "already finished"});

// The promise object is same-compartment with |f|.
assert.sameValue(isSameCompartment(p3, f), true);

// Note: This doesn't follow the spec, which requires that only |p3 instanceof Promise| is true.
assert.sameValue(p3 instanceof Promise || p3 instanceof g.Promise, true);

p3.then(v => {
  // The iterator result object is same-compartment with |f|.
  assert.sameValue(isSameCompartment(v, f), true);
  assert.sameValue(v.done, true);
  assert.sameValue(v.value, undefined);
});

var p4 = next.call({}, {message: "bad |this| argument"});

// The promise object is same-compartment with |next|.
assert.sameValue(isSameCompartment(p4, next), true);

// Only in this case we're following the spec and are creating the promise object
// in the correct realm.
assert.sameValue(p4 instanceof Promise, true);

p4.then(() => {
  throw new Error("expected a TypeError");
}, e => {
  assert.sameValue(e instanceof TypeError, true);
});

