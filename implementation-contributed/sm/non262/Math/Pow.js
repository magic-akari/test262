// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Math-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

var BUGNUMBER = 1135708;
var summary = "Implement the exponentiation operator";

print(BUGNUMBER + ": " + summary);

// Constant folding
assert.sameValue(2 ** 2 ** 3, 256);
assert.sameValue(1 ** 1 ** 4, 1);

// No folding
var two = 2;
var three = 3;
var four = 4;
assert.sameValue(two ** two ** three, 256);
assert.sameValue(1 ** 1 ** four, 1);

// Operator precedence
assert.sameValue(2 ** 3 / 2 ** 3, 1);
assert.sameValue(2 ** 3 * 2 ** 3, 64);
assert.sameValue(2 ** 3 + 2 ** 3, 16);

// With parentheses
assert.sameValue((2 ** 3) ** 2, 64);
assert.sameValue(2 ** (3 ** 2), 512);

// Assignment operator
var x = 2;
assert.sameValue(x **= 2 ** 3, 256);
assert.sameValue(x, 256);

// Loop to test baseline and ION
for (var i=0; i<10000; i++) {
    assert.sameValue((2 ** 3) ** 2, 64);
    assert.sameValue(2 ** (3 ** 2), 512);
    var x = 2;
    assert.sameValue(x **= 2 ** 3, 256);
    assert.sameValue(x, 256);
}

// Comments should not be confused with exp operator
var a, c, e;
a = c = e = 2;
assert.sameValue(a**/**b**/c/**/**/**d**/e, 16);

// Two stars separated should not parse as exp operator
assertThrowsInstanceOf(function() { return Reflect.parse("2 * * 3"); }, SyntaxError);

// Left-hand side expression must not be a unary expression.
for (let unaryOp of ["delete", "typeof", "void", "+", "-", "!", "~"]) {
    assertThrowsInstanceOf(() => eval(unaryOp + " a ** 2"), SyntaxError);
    assertThrowsInstanceOf(() => eval(unaryOp + " " + unaryOp + " a ** 2"), SyntaxError);
}

// Test the other |delete| operators (DELETENAME and DELETEEXPR are already tested above).
assertThrowsInstanceOf(() => eval("delete a.name ** 2"), SyntaxError);
assertThrowsInstanceOf(() => eval("delete a[0] ** 2"), SyntaxError);

// Unary expression lhs is valid if parenthesized.
for (let unaryOp of ["delete", "void", "+", "-", "!", "~"]) {
    let a = 0;
    eval("(" + unaryOp + " a) ** 2");
    eval("(" + unaryOp + " " + unaryOp + " a) ** 2");
}
{
    let a = {};
    (delete a.name) ** 2;
    (delete a[0]) ** 2;
}

// Check if error propagation works
var thrower = {
    get value() {
        throw new Error();
    }
};

assertThrowsInstanceOf(function() { return thrower.value ** 2; }, Error);
assertThrowsInstanceOf(function() { return 2 ** thrower.value; }, Error);
assertThrowsInstanceOf(function() { return 2 ** thrower.value ** 2; }, Error);

var convertibleToPrimitive = {
    valueOf: function() {
        throw new Error("oops");
    }
};

assertThrowsInstanceOf(function() { return convertibleToPrimitive ** 3; }, Error);
assertThrowsInstanceOf(function() { return 3 ** convertibleToPrimitive; }, Error);

assert.sameValue(NaN ** 2, NaN);
assert.sameValue(2 ** NaN, NaN);
assert.sameValue(2 ** "3", 8);
assert.sameValue("2" ** 3, 8);

// Reflect.parse generates a correct parse tree for simplest case
var parseTree = Reflect.parse("a ** b");
assert.sameValue(parseTree.body[0].type, "ExpressionStatement");
assert.sameValue(parseTree.body[0].expression.operator, "**");
assert.sameValue(parseTree.body[0].expression.left.name, "a");
assert.sameValue(parseTree.body[0].expression.right.name, "b");

// Reflect.parse generates a tree following the right-associativity rule
var parseTree = Reflect.parse("a ** b ** c");
assert.sameValue(parseTree.body[0].type, "ExpressionStatement");
assert.sameValue(parseTree.body[0].expression.left.name, "a");
assert.sameValue(parseTree.body[0].expression.right.operator, "**");
assert.sameValue(parseTree.body[0].expression.right.left.name, "b");
assert.sameValue(parseTree.body[0].expression.right.right.name, "c");

