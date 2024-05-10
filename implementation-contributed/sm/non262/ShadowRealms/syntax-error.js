// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
let sr = new ShadowRealm();

try {
    sr.evaluate("var x /");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof SyntaxError, true, "Same Global Error")
    assert.sameValue(/unterminated regular expression literal/.test(e.message), true, "Should have reported a sensible error message");
}

try {
    sr.evaluate("var x =");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof SyntaxError, true, "Same Global Error")
    assert.sameValue(/expected expression/.test(e.message), true, "Should have reported a sensible error message");
}


try {
    sr.evaluate("#x in this");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof SyntaxError, true, "Same Global Error")
    assert.sameValue(/reference to undeclared private field or method/.test(e.message), true, "Should have reported a sensible error message");
}



