// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- non262-template-strings-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
const getStrings = (strings, ...values) => strings;
const getRef = () => getStrings`test`;
let c = getRef();
relazifyFunctions(getRef);
assert.sameValue(getRef(), c);
// Note the failure case here looks like this:
// Assertion failed: got ["test"], expected ["test"]
// If you're reading this test and going "wtf", it's because this is testing
// reference identity of the array object - they're actually different arrays,
// but have the same contents.

