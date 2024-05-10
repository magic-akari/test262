// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Error-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/const nativeErrors = [
    InternalError,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError
];

const expectedOwnKeys = "toSource" in Object.prototype
                        ? "toSource,toString,message,name,stack,constructor"
                        : "toString,message,name,stack,constructor";
assert.sameValue(Reflect.ownKeys(Error.prototype).toString(), expectedOwnKeys);
assert.sameValue(Error.prototype.name, "Error");
assert.sameValue(Error.prototype.message, "");

for (const error of nativeErrors) {
    assert.sameValue(Reflect.ownKeys(error.prototype).toString(), "message,name,constructor");
    assert.sameValue(error.prototype.name, error.name);
    assert.sameValue(error.prototype.message, "");
    assert.sameValue(error.prototype.constructor, error);
}

