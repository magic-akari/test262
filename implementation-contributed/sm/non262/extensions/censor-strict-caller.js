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


function nonstrict() { return nonstrict.caller; }
function strict() { "use strict"; return nonstrict(); }

assert.sameValue(strict(), null);

/******************************************************************************/

print("All tests passed!");
