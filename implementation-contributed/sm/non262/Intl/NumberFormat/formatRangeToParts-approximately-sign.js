// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Intl-NumberFormat-shell.js
- non262-Intl-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features:
- Intl
description: |
  pending
esid: pending
---*/
if (typeof getAvailableLocalesOf === "undefined") {
  var getAvailableLocalesOf = SpecialPowers.Cu.getJSTestingFunctions().getAvailableLocalesOf;
}

const numbers = [
  0, 1, 2, 5, 10, 100, 1000, 10_000, 100_000, 1_000_000,
  0.1, 0.2, 0.5, 1.5,
  -0, -1, -2, -5,
  Infinity, -Infinity,
];

const options = {};

// List of known approximately sign in CLDR 40.
const approximatelySigns = [
  "~", "∼", "≈", "≃", "ca.", "約", "dáàṣì", "dáàshì",
];

// Iterate over all locales and ensure we find exactly one approximately sign.
for (let locale of getAvailableLocalesOf("NumberFormat").sort()) {
  let nf = new Intl.NumberFormat(locale, options);
  for (let number of numbers) {
    let parts = nf.formatRangeToParts(number, number);
    let approx = parts.filter(part => part.type === "approximatelySign");

    assert.sameValue(approx.length, 1);
    assert.sameValue(approximatelySigns.some(approxSign => approx[0].value.includes(approxSign)), true);
  }
}

