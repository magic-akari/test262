// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
- deepEqual.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/// The cycle check in 9.1.2 [[SetPrototypeOf]] does not walk proxies.
// Therefore it's very easy to create prototype chain cycles involving proxies,
// and the spec requires us to accept this.

var t = {};
var p = new Proxy(t, {});
Object.setPrototypeOf(t, p);  // 🙈

// Actually doing anything that searches this object's prototype chain
// technically should not terminate. We instead throw "too much recursion".
for (var obj of [t, p]) {
    assertThrowsInstanceOf(() => "x" in obj, InternalError);
    assertThrowsInstanceOf(() => obj.x, InternalError);
    assertThrowsInstanceOf(() => { obj.x = 1; }, InternalError);
}
