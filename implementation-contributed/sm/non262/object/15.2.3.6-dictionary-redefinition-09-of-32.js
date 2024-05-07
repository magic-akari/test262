// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
- deepEqual.js
flags:
- noStrict
features: []
info: |
  uses shell load() function
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

loadRelativeToScript("defineProperty-setup.js");
runDictionaryPropertyPresentTestsFraction(9, 32);
