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
// bug 963641

Reflect.parse("({ __proto__: null });");
Reflect.parse("var { __proto__: x } = obj;");
Reflect.parse("var [{ __proto__: y }] = obj;");
Reflect.parse("[{ __proto__: y }] = arr;");
Reflect.parse("({ __proto__: y } = obj);");

print("Tests complete");
