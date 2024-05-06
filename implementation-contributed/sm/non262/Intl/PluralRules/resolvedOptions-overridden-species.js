// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
flags:
- noStrict
features:
- Intl
description: |
  pending
esid: pending
---*/
// Tests the PluralRules.resolvedOptions function for overriden Array[Symbol.species].

var pl = new Intl.PluralRules("de");

Object.defineProperty(Array, Symbol.species, {
    value: function() {
        return new Proxy(["?"], {
            get(t, pk, r) {
                return Reflect.get(t, pk, r);
            },
            defineProperty(t, pk) {
                return true;
            }
        });
    }
});

var pluralCategories = pl.resolvedOptions().pluralCategories;

assert.compareArray(pluralCategories, ["one", "other"]);

