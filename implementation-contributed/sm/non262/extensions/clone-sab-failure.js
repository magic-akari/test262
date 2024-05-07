// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*//* -*- Mode: js2; tab-width: 40; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/*
 * Any copyright is dedicated to the Public Domain.
 * https://creativecommons.org/publicdomain/zero/1.0/
 */

// Failure to serialize an object containing a SAB should not leave the SAB's
// rawbuffer's reference count incremented.

if (!this.SharedArrayBuffer || !this.sharedArrayRawBufferRefcount) {
quit(0);
}

let x = new SharedArrayBuffer(1);

// Initially the reference count is 1.
assert.sameValue(sharedArrayRawBufferRefcount(x), 1);

let y = serialize(x, [], {SharedArrayBuffer: 'allow'});

// Serializing it successfully increments the reference count.
assert.sameValue(sharedArrayRawBufferRefcount(x), 2);

// Serializing something containing a function should throw.
var failed = false;
try {
    serialize([x, function () {}]);
}
catch (e) {
    failed = true;
}
assert.sameValue(failed, true);

// Serializing the SAB unsuccessfully does not increment the reference count.
assert.sameValue(sharedArrayRawBufferRefcount(x), 2);

