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

var global = this;

(function() {
    function f() {
        this.b = function() {};
        Object.defineProperty(this, "b", ({
            configurable: global.__defineSetter__("", function() {})
        }));
    }
    for (y of [0]) {
        _ = new f();
    }
})();
uneval(this);

