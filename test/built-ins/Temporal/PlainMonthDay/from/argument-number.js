// Copyright (C) 2022 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plainmonthday.from
description: A number is invalid in place of an ISO string for Temporal.PlainMonthDay
features: [Temporal]
---*/

const arg = 1118;

const numbers = [
  1,
  1118,
  -1118,
  12345,
];

for (const arg of numbers) {
  assert.throws(
    TypeError,
    () => Temporal.PlainMonthDay.from(arg),
    "A number is not a valid ISO string for PlainMonthDay"
  );
}
