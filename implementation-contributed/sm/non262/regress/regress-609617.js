// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-regress-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*//* -*- indent-tabs-mode: nil; js-indent-level: 4 -*- */
/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

var actual;
var expect = "pass";

var x = "fail";
function f() {
    var x = "pass"; 
    delete(eval("actual = x"));
}
f();
assert.sameValue(actual, expect);

function g() { return 1 }
function h() { function g() { throw 2; } eval('g()')++; } 

try {
    h();
    assert.sameValue(0, -1);
} catch (e) {
    assert.sameValue(e, 2);
}

var lhs_prefix = ["",        "++", "--", "",   "",   "[",             "[y, "      ];
var lhs_suffix = [" = 'no'", "",   "",   "++", "--", ", y] = [3, 4]", "] = [5, 6]"];

for (var i = 0; i < lhs_prefix.length; i++) {
    try {
        eval(lhs_prefix[i] + "eval('x')" + lhs_suffix[i]);
        assert.sameValue(i, -2);
    } catch (e) {
        if (/\[/.test(lhs_prefix[i])) {
            assert.sameValue(e.message, "invalid destructuring target");
        } else {
            /*
             * NB: JSOP_SETCALL throws only JSMSG_ASSIGN_TO_CALL, it does not
             * specialize for ++ and -- as the compiler's error reporting does. See
             * the next section's forked assert.sameValue code.
             */
            assert.sameValue(e.message, "cannot assign to function call");
        }
    }
}

/* Now test for strict mode rejecting any SETCALL variant at compile time. */
for (var i = 0; i < lhs_prefix.length; i++) {
    try {
        eval("(function () { 'use strict'; " + lhs_prefix[i] + "foo('x')" + lhs_suffix[i] + "; })");
        assert.sameValue(i, -3);
    } catch (e) {
        if (/\+\+|\-\-/.test(lhs_prefix[i] || lhs_suffix[i]))
            assert.sameValue(e.message, "invalid increment/decrement operand");
        else if (/\[/.test(lhs_prefix[i]))
            assert.sameValue(e.message, "invalid destructuring target");
        else
            assert.sameValue(e.message, "invalid assignment left-hand side");
    }
}

/*
 * The useless delete is optimized away, but the SETCALL must not be. It's not
 * an early error, though.
 */
var fooArg;
function foo(arg) { fooArg = arg; }
try {
    eval("delete (foo('x') = 42);");
    assert.sameValue(0, -4);
} catch (e) {
    assert.sameValue(e.message, "cannot assign to function call");
}
assert.sameValue(fooArg, 'x');

/* Delete of a call expression is not an error at all, even in strict mode. */
function g() {
    "use strict";
    assert.sameValue(delete Object(), true);
}
g();

