// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features:
- oomTest
description: |
  pending
esid: pending
---*/
let lfPreamble = `
`;
oomTest(new Function(`var TOTAL_MEMORY = 50 * 1024 * 1024;
HEAP = IHEAP = new Int32Array(TOTAL_MEMORY);
function __Z9makeFastaI10RandomizedEvPKcS2_jRT_(\$id, \$desc, \$N, \$output)
{
}
`));

