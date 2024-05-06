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
source = `class A {
  // Ensure this name parses. Failure would be an InternalError: Buffer too
  // small
  #℘;
}`;

Function(source);

