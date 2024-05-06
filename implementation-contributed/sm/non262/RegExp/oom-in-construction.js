// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
- compareArray.js
flags:
- noStrict
features:
- oomTest
description: |
  pending
esid: pending
---*/var BUGNUMBER = 1471371;
var summary = 'Handle OOM in RegExp';

printBugNumber(BUGNUMBER);
printStatus(summary);

oomTest(function () {
    for (var i = 0; i < 10; ++i) {
        try {
            RegExp("", "gimuyz");
        } catch { }
    }
});

