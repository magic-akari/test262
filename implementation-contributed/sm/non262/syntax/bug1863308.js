// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- non262-syntax-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/try {
    eval("for (let case of ['foo', 'bar']) {}")
}
catch(e) {
    assert.sameValue(e instanceof SyntaxError, true)
    assert.sameValue(e.message, "unexpected token: keyword 'case'");
}

try {
    eval("for (let debugger of ['foo', 'bar']) {}")
}
catch(e) {
    assert.sameValue(e instanceof SyntaxError, true)
    assert.sameValue(e.message, "unexpected token: keyword 'debugger'");
}

try {
    eval("for (let case in ['foo', 'bar']) {}")
}
catch(e) {
    assert.sameValue(e instanceof SyntaxError, true)
    assert.sameValue(e.message, "unexpected token: keyword 'case'");
}

try {
    eval("for (let debugger in ['foo', 'bar']) {}")
}
catch(e) {
    assert.sameValue(e instanceof SyntaxError, true)
    assert.sameValue(e.message, "unexpected token: keyword 'debugger'");
}

