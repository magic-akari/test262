// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-regress-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*//* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

var sandbox = evalcx('');
var foreign = evalcx('({ get f() { return this; }, set x(v) { result = this } })', sandbox);
var local = Object.create(foreign);

assert.sameValue(local, local.f, "this should be set correctly in getters");
local.x = 42;
assert.sameValue(local, sandbox.result, "this should be set correctly in setters");
