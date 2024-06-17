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
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError
];

const expectedOwnKeys = "toSource" in Object.prototype
                        ? "constructor,message,name,stack,toSource,toString"
                        : "constructor,message,name,stack,toString";
assert.sameValue(Reflect.ownKeys(Error.prototype).sort().toString(), expectedOwnKeys);
assert.sameValue(Error.prototype.name, "Error");
assert.sameValue(Error.prototype.message, "");

for (const error of nativeErrors) {
    assert.sameValue(Reflect.ownKeys(error.prototype).sort().toString(), "constructor,message,name");
    assert.sameValue(error.prototype.name, error.name);
    assert.sameValue(error.prototype.message, "");
    assert.sameValue(error.prototype.constructor, error);
}

