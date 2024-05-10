// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-PrivateName-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/function assertLineAndColumn(str, line, column) {
  try {
    eval(str);
    throw 'didn\'t syntaxerror, bad.'
  } catch (e) {
    assert.sameValue(e instanceof SyntaxError, true);
    assert.sameValue(e.lineNumber, line);
    assert.sameValue(e.columnNumber, column);
  }
}

assertLineAndColumn(`class A { g() { return this.#x; }}`, 1, 29);
// Make sure we're reporting the first error, if there are multiple, in class
// exit context;
assertLineAndColumn(
    `class A { g() { return this.#x; } y() { return       this.#z + this.#y; } }`,
    1, 29);
assertLineAndColumn(`this.#x`, 1, 6);
// Make sure we're reporting the first error, if there are multiple, in
// non-class context;
assertLineAndColumn(`this.#x; this.#y; this.#z`, 1, 6);

assertLineAndColumn(
    `class A {
g() { return this.#x; }}`,
    2, 19);
assertLineAndColumn(
    `class A {

g() { return this.#x; } y() { return this.#y; }}`,
    3, 19);

