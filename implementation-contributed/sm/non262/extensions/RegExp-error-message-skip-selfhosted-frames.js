// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
description: |
  pending
esid: pending
---*/for (let name of ["test", Symbol.match, Symbol.replace, Symbol.search]) {
    try {
        RegExp.prototype[name].call({});
    } catch (e) {
        let methodName = typeof name === "symbol" ? `[${name.description}]` : name;
        assert.sameValue(e.message, `${methodName} method called on incompatible Object`);
    }
}

