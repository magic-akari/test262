// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/
// Contributors: Jesse Ruderman <jruderman@gmail.com>,
//               Gary Kwong <gary@rumblingedge.com>,
//               Jason Orendorff <jorendorff@mozilla.com>

try {
    evalcx('var p;', []);
} catch (exc) {}

try {
    evalcx('');
    Function("evalcx(\"var p\",[])")();
} catch (exc) {}

try {
    evalcx('var p;');
} catch (exc) {}

