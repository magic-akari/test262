// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
flags:
- noStrict
features: []
info: |
  needs Debugger
description: |
  pending
esid: pending
---*/
let g = newGlobal({ newCompartment: true });
let dbg = new Debugger(g);
dbg.memory.trackingAllocationSites = true;
g.createExternalArrayBuffer(64);

