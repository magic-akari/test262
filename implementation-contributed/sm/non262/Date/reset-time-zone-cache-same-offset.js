// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  Windows doesn't accept IANA names for the TZ env variable
description: |
  pending
esid: pending
---*/
const testCases = [
    {
        timeZone: "Europe/London",
        string: "Tue Aug 14 2018 00:00:00 GMT+0100 (BST)",
        alternativeTimeZones: ["British Summer Time"],
        localeString: "8/14/2018, 12:00:00 AM GMT+1",
    },
    {
        timeZone: "UTC",
        string: "Tue Aug 14 2018 00:00:00 GMT+0000 (UTC)",
        alternativeTimeZones: ["Coordinated Universal Time"],
        localeString: "8/14/2018, 12:00:00 AM UTC",
    },
];

// Repeat twice to test both transitions (Europe/London -> UTC and UTC -> Europe/London).
for (let i = 0; i < 2; ++i) {
    for (let {timeZone, string, localeString, alternativeTimeZones} of testCases) {
        setTimeZone(timeZone);

        let dt = new Date(2018, 8 - 1, 14);
        assertDateTime(dt, string, ...alternativeTimeZones);
        assert.sameValue(dt.toLocaleString("en-US", {timeZoneName: "short"}), localeString);
    }
}

