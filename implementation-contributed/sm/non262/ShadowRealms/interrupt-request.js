// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
// Request interrupt from shadow realm evaluation.

expectExitCode(6);

new ShadowRealm().evaluate(`
  (interruptIf => {
    interruptIf(true);

    for (;;) {}  // Wait for interrupt.
  });
`)(interruptIf);

