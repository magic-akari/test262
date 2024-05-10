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
---*/
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

assert.sameValue(uneval(Symbol.iterator), "Symbol.iterator");
assert.sameValue(uneval(Symbol()), "Symbol()");
assert.sameValue(uneval(Symbol("")), 'Symbol("")');
assert.sameValue(uneval(Symbol("ponies")), 'Symbol("ponies")');
assert.sameValue(uneval(Symbol.for("ponies")), 'Symbol.for("ponies")');

assert.sameValue({glyph: Symbol(undefined)}.toSource(), "({glyph:Symbol()})");

