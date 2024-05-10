// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  needs drainJobQueue
description: |
  pending
esid: pending
---*/
{
  let {resolve, promise} = Promise.withResolvers();

  let result = undefined;
  promise.then((v) => result = v);
  resolve(5);

  drainJobQueue();
  assert.sameValue(result, 5);
}

{
  let {reject, promise} = Promise.withResolvers();

  let result = undefined;
  promise.catch((v) => result = v);
  reject("abc");

  drainJobQueue();
  assert.sameValue(result, "abc");
}

