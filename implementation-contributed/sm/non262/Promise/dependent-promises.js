// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  needs Debugger
description: |
  pending
esid: pending
---*/
var g = newGlobal({newCompartment: true});
var dbg = new Debugger(g);
var gw = dbg.addDebuggee(g);

g.eval(`
var p = new Promise(() => {});
p.name = "p";
var q = p.then();
q.name = "q";
var r = p.then(null, () => {});
r.name = "r";
var s = Promise.all([p, q]);
s.name = "s";
var t = Promise.race([r, s]);
t.name = "t";
`);

function getDependentNames(promise) {
    return gw.makeDebuggeeValue(promise).promiseDependentPromises.map((p) => p.getOwnPropertyDescriptor('name').value);
}

function arraysEqual(arr1, arr2, msg) {
    assert.sameValue(arr1.length, arr2.length, msg + ": length");
    for (var i = 0; i < arr1.length; ++i) {
        assert.sameValue(arr1[i], arr2[i], msg + ": [" + i + "]");
    }
}

arraysEqual(getDependentNames(g.p), ["q", "r", "s"], "deps for p");
arraysEqual(getDependentNames(g.q), ["s"], "deps for q");
arraysEqual(getDependentNames(g.r), ["t"], "deps for r");
arraysEqual(getDependentNames(g.s), ["t"], "deps for s");

