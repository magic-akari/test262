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
description: |
  pending
esid: pending
---*/// -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

function testRegExp(b, c=b) {
    var a = deserialize(serialize(b));
    assert.sameValue(a === b, false);
    assert.sameValue(Object.getPrototypeOf(a), RegExp.prototype);
    assert.sameValue(Object.prototype.toString.call(a), "[object RegExp]");
    for (p in a)
        throw new Error("cloned RegExp should have no enumerable properties");

    assert.sameValue(a.source, c.source);
    assert.sameValue(a.global, c.global);
    assert.sameValue(a.ignoreCase, c.ignoreCase);
    assert.sameValue(a.multiline, c.multiline);
    assert.sameValue(a.sticky, c.sticky);
    assert.sameValue("expando" in a, false);
}

testRegExp(RegExp(""));
testRegExp(/(?:)/);
testRegExp(/^(.*)$/gimy);

var re = /\bx\b/gi;
re.expando = true;
testRegExp(re);
// `source` and the flag accessors are defined on RegExp.prototype, so they're
// not available after re.__proto__ has been changed. We solve that by passing
// in an additional copy of the same RegExp to compare the
// serialized-then-deserialized clone with."
re.__proto__ = {};
testRegExp(re, /\bx\b/gi);

