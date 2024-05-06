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
var tag = "de-Latn-AT-u-ca-gregory-nu-latn-co-phonebk-kf-false-kn-hc-h23";
var locale = new Intl.Locale(tag);
var scwLocale = wrapWithProto(locale, Intl.Locale.prototype);

for (var [key, {get, value = get}] of Object.entries(Object.getOwnPropertyDescriptors(Intl.Locale.prototype))) {
    if (typeof value === "function") {
        if (key !== "constructor") {
            var expectedValue = value.call(locale);

            if (typeof expectedValue === "string" || typeof expectedValue === "boolean") {
                assert.sameValue(value.call(scwLocale), expectedValue, key);
            } else if (expectedValue instanceof Intl.Locale) {
                assert.sameValue(value.call(scwLocale).toString(), expectedValue.toString(), key);
            } else {
                throw new Error("unexpected result value");
            }
        } else {
            assert.sameValue(new value(scwLocale).toString(), new value(locale).toString(), key);
        }
    }
}

