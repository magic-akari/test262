// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
var sr = new ShadowRealm();

var w = wrapWithProto(sr, null);

var r = ShadowRealm.prototype.evaluate.call(w, `"ok"`);

assert.sameValue(r, "ok");

