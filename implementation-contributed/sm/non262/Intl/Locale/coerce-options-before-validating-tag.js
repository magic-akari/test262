// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features:
- Intl
description: |
  pending
esid: pending
---*/
// Throw a TypeError when the |options| argument is null before validating the
// language tag argument.
assertThrowsInstanceOf(() => {
  new Intl.Locale("invalid_tag", null);
}, TypeError);

