// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-lexical-environment-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
function assertEvaluateAndIndirectEvalThrows(str) {
  assertThrowsInstanceOf(() => evaluate(str), TypeError);
  assertThrowsInstanceOf(() => (1,eval)(str), TypeError);
}

// Regular vars
assertEvaluateAndIndirectEvalThrows(`var NaN; function NaN() {}`);

// for-of vars
assertEvaluateAndIndirectEvalThrows(`for (var NaN of []); function NaN() {}`);

// Annex B.3.3 synthesized vars
assertEvaluateAndIndirectEvalThrows(`{ function NaN() {} } function NaN() {}`);

// Non-data properties
Object.defineProperty(this, 'foo', { set: function() {} });
assertEvaluateAndIndirectEvalThrows(`var foo; function foo() {}`);
assertEvaluateAndIndirectEvalThrows(`for (var foo of []); function foo() {}`);
assertEvaluateAndIndirectEvalThrows(`{ function foo() {} } function foo() {}`);

