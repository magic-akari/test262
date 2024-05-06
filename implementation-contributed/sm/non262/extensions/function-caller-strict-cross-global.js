// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  needs newGlobal()
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

var g1 = newGlobal();
g1.evaluate("function f() { return f.caller; }");

var g2 = newGlobal();
g2.f = g1.f;

assert.sameValue(g2.evaluate("function g() { 'use strict'; return f(); } g()"), null);

print("Tests complete");
