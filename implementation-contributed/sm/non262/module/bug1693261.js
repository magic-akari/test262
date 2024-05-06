// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
flags:
- noStrict
- module
features: []
info: |
  needs drainJobQueue
description: |
  pending
esid: pending
---*/
import "./bug1693261-c1.mjs";
import "./bug1693261-c2.mjs";
import "./bug1693261-x.mjs";
if (globalThis.testArray === undefined) {
  globalThis.testArray = [];
}
globalThis.testArray.push("index");

function assert.compareArray(actual, expected) {
	if (actual.length != expected.length) {
		throw new Error(
			"array lengths not equal: got " +
			JSON.stringify(actual) + ", expected " + JSON.stringify(expected));
	}

	for (var i = 0; i < actual.length; ++i) {
		if (actual[i] != expected[i]) {
		throw new Error(
			"arrays not equal at element " + i + ": got " +
			JSON.stringify(actual) + ", expected " + JSON.stringify(expected));
		}
	}
}

assert.compareArray(globalThis.testArray, [
	'async 1', 'async 2', 'c1', 'c2', 'x', 'index'
])

drainJobQueue();
