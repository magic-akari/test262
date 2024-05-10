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
var a = function() {
    return function ({x: arguments}) {
        return arguments;
    }
}
var b = eval(uneval(a));

assert.sameValue(a()({x: 1}), 1);
assert.sameValue(b()({x: 1}), 1);

