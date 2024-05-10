// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
description: |
  pending
esid: pending
---*/function testName(thisv) {
  var failures = [
    // Not a function
    "length",
    // TODO: Different implementation
    "toString",
    "toSource",
    "valueOf",
    // Aliases
    "trimLeft",
    "trimRight",
    // Returns empty string
    "constructor"
  ]

  var keys = Object.getOwnPropertyNames(String.prototype);
  for (var key of keys) {
    var message;
    try {
      String.prototype[key].call(thisv);
    } catch (e) {
      message = e.message;
    }

    var expected = `String.prototype.${key} called on incompatible ${thisv}`;
    if (failures.includes(key)) {
      assert.sameValue(message !== expected, true)
    } else {
      assert.sameValue(message, expected);
    }
  }
}
testName(null);
testName(undefined);

// On-off test for Symbol.iterator
function testIterator(thisv) {
  var message;
  try {
    String.prototype[Symbol.iterator].call(thisv);
  } catch (e) {
    message = e.message;
  }

  assert.sameValue(message, `String.prototype[Symbol.iterator] called on incompatible ${thisv}`);
}
testIterator(null);
testIterator(undefined);

