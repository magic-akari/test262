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
assertThrowsInstanceOf(() => evaluate(`try { throw {} } catch ({e}) { var e; }`), SyntaxError);
assertThrowsInstanceOf(() => evaluate(`try { throw {} } catch ({e}) { eval('var e'); }`), SyntaxError);

assertThrowsInstanceOf(() => new Function(`try { throw {} } catch ({e}) { var e; }`), SyntaxError);
assertThrowsInstanceOf(new Function(`try { throw {} } catch ({e}) { eval('var e'); }`), SyntaxError);

