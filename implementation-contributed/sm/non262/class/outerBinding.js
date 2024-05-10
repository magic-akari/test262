// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*///
// The above skip-if is because global lexicals aren't yet implemented. Remove
// that and the |evaluate| call below once they are.
//
// A class statement creates a mutable lexical outer binding.

class Foo { constructor() { } }
assert.sameValue(typeof Foo, "function");
Foo = 5;
assert.sameValue(Foo, 5);

{
    class foo { constructor() { } }
    assert.sameValue(typeof foo, "function");
    foo = 4;
    assert.sameValue(foo, 4);
}

{
    class PermanentBinding { constructor() { } }
    delete PermanentBinding;
    // That...didn't actually work, right?
    assert.sameValue(typeof PermanentBinding, "function");
}

evaluate("const globalConstant = 0; var earlyError = true;");

try {
    evaluate("earlyError = false; class globalConstant { constructor() { } }");
} catch (e) {
    if (!(e instanceof SyntaxError))
        throw e;
}
assert.sameValue(earlyError, true);

function strictEvalShadows() {
    "use strict";
    let x = 4;
    eval(`class x { constructor() { } }
           assert.sameValue(typeof x, "function");
         `);
    assert.sameValue(x, 4);
}
strictEvalShadows()

