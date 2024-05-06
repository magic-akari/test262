// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/// |reftest| skip-if(!xulRuntime.shell)
// bug 905774

// Proxy options
var opts = new Proxy({loc: false}, {});
assert.sameValue("loc" in Reflect.parse("0;", opts), false);
opts.loc = true;
assert.sameValue(Reflect.parse("0;", opts).loc !== null, true);
delete opts.loc;
assert.sameValue(Reflect.parse("0;", opts).loc !== null, true);  // default is true

