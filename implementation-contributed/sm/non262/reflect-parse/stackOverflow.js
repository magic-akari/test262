// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-reflect-parse-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/// Bug 632024: no crashing on stack overflow
try {
    Reflect.parse(Array(3000).join("x + y - ") + "z")
} catch (e) { }

