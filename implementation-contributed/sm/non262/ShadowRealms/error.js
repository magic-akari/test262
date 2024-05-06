// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
let sr = new ShadowRealm();

try {
    sr.evaluate("throw new Error('hi')");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/Error: hi/.test(e.message), true, "Should have included information from thrown error");
}

try {
    sr.evaluate("throw new Error('∂å∂')");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/Error: ∂å∂/.test(e.message), true, "Should have included information from thrown error, UTF-8 Pass through.");
}

try {
    sr.evaluate("throw {name: 'Hello', message: 'goodbye'}");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/uncaught exception: Object/.test(e.message), true, "Should get generic fillin message, non-string");
}

try {
    sr.evaluate("throw {name: 10, message: 11}");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/uncaught exception: Object/.test(e.message), true, "Should get generic fillin message, non-string");
}


try {
    sr.evaluate("throw { get name() { return 'holy'; }, get message() { return 'smokes' } }");
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/uncaught exception: Object/.test(e.message), true, "Should get generic error message, getters");
}

// Wrapped Functions
try {
    var wrapped = sr.evaluate("() => { throw new Error('hi') }");
    assert.sameValue(!!wrapped, true, "Wrapped created");
    wrapped();
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/Error: hi/.test(e.message), true, "Should have included information from thrown error");
}

try {
    var wrapped = sr.evaluate("() => { throw new Error('∂å∂') } ");
    assert.sameValue(!!wrapped, true, "Wrapped created");
    wrapped();
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/Error: ∂å∂/.test(e.message), true, "Should have included information from thrown error, UTF-8 Pass through.");
}

try {
    var wrapped = sr.evaluate("() => { throw {name: 'Hello', message: 'goodbye'} } ");
    assert.sameValue(!!wrapped, true, "Wrapped created");
    wrapped();
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/uncaught exception: Object/.test(e.message), true, "Should get generic error message");
}

try {
    var wrapped = sr.evaluate("() =>  { throw {name: 10, message: 11} } ");
    assert.sameValue(!!wrapped, true, "Wrapped created");
    wrapped();
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    print(e.message)
    assert.sameValue(/uncaught exception: Object/.test(e.message), true, "Should get generic error message");
}


try {
    var wrapped = sr.evaluate("() => {  throw { get name() { return 'holy'; }, get message() { return 'smokes' } } } ");
    assert.sameValue(!!wrapped, true, "Wrapped created");
    wrapped();
    assert.sameValue(true, false, "Should have thrown");
} catch (e) {
    assert.sameValue(e instanceof TypeError, true, "Correct type of error")
    assert.sameValue(/uncaught exception: Object/.test(e.message), true, "Should get generic error message");
}



