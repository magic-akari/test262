// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
- compareArray.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
var BUGNUMBER = 1509768;
var summary = "String#replace with an empty string pattern on a rope should prepend the replacement string.";

print(BUGNUMBER + ": " + summary);

// Rope is created when the string length >= 25.
//
// This testcase depends on that condition to reliably test the code for
// String#replace on a rope.
//
// Please rewrite this testcase when the following assertion fails.
assert.sameValue(isRope("a".repeat(24)), false);
assert.sameValue(isRope("a".repeat(25)), true);

// Not a rope.
assert.sameValue("a".repeat(24).replace("", "foo"),
         "foo" + "a".repeat(24));
assert.sameValue("a".repeat(24).replace("", ""),
         "a".repeat(24));

// A rope.
assert.sameValue("a".repeat(25).replace("", "foo"),
         "foo" + "a".repeat(25));
assert.sameValue("a".repeat(25).replace("", ""),
         "a".repeat(25));

