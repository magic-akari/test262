// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
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

// Minimal test cases.  Note that on 64-bit a SharedArrayBuffer is
// very expensive under these rules - a 4GB area is reserved for it.
// So don't go allocating a ton of them.
//
// These tests cannot test that sharing works across workers.  There
// are or will be tests, in dom/workers, that do that.

var b;

function testSharedArrayBuffer() {
    b = new SharedArrayBuffer("4096"); // Test string conversion, too
    assert.sameValue(b instanceof SharedArrayBuffer, true);
    assert.sameValue(b.byteLength, 4096);

    b.fnord = "Hi there";
    assert.sameValue(b.fnord, "Hi there");

    SharedArrayBuffer.prototype.abracadabra = "no wishing for wishes!";
    assert.sameValue(b.abracadabra, "no wishing for wishes!");

    // SharedArrayBuffer is not a conversion operator, not even for instances of itself
    assertThrowsInstanceOf(() => SharedArrayBuffer(b), TypeError);

    // can't convert any other object either
    assertThrowsInstanceOf(() => SharedArrayBuffer({}), TypeError);

    // byteLength can be invoked as per normal, indirectly
    assert.sameValue(Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype,"byteLength").get.call(b), 4096);

    // however byteLength is not generic
    assertThrowsInstanceOf(() => Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype,"byteLength").get.call({}), TypeError);

}

function testSharedTypedArray() {
    var x1 = new Int8Array(b);
    var x2 = new Int32Array(b);

    assert.sameValue(ArrayBuffer.isView(x1), true); // ArrayBuffer.isView() works even if the buffer is a SharedArrayBuffer
    assert.sameValue(ArrayBuffer.isView(x2), true);
    assert.sameValue(ArrayBuffer.isView({}), false);

    assert.sameValue(x1.buffer, b);
    assert.sameValue(x2.buffer, b);

    assert.sameValue(x1.byteLength, b.byteLength);
    assert.sameValue(x2.byteLength, b.byteLength);

    assert.sameValue(x1.byteOffset, 0);
    assert.sameValue(x2.byteOffset, 0);

    assert.sameValue(x1.length, b.byteLength);
    assert.sameValue(x2.length, b.byteLength / 4);

    var x3 = new Int8Array(b, 20);
    assert.sameValue(x3.length, b.byteLength - 20);
    assert.sameValue(x3.byteOffset, 20);

    var x3 = new Int32Array(b, 20, 10);
    assert.sameValue(x3.length, 10);
    assert.sameValue(x3.byteOffset, 20);

    // Mismatched type
    assertThrowsInstanceOf(() => Int8Array(x2), TypeError);

    // Unconvertable object
    assertThrowsInstanceOf(() => Int8Array({}), TypeError);

    // negative start
    assertThrowsInstanceOf(() => new Int8Array(b, -7), RangeError);

    // not congruent mod element size
    assertThrowsInstanceOf(() => new Int32Array(b, 3), RangeError);

    // start out of range
    assertThrowsInstanceOf(() => new Int32Array(b, 4104), RangeError);

    // end out of range
    assertThrowsInstanceOf(() => new Int32Array(b, 4092, 2), RangeError);

    // Views alias the storage
    x2[0] = -1;
    assert.sameValue(x1[0], -1);
    x1[0] = 1;
    x1[1] = 1;
    x1[2] = 1;
    x1[3] = 1;
    assert.sameValue(x2[0], 0x01010101);

    assert.sameValue(x2[5], 0);
    x3[0] = -1;
    assert.sameValue(x2[5], -1);

    // Out-of-range accesses yield undefined
    assert.sameValue(x2[1023], 0);
    assert.sameValue(x2[1024], undefined);
    assert.sameValue(x2[2047], undefined);
}

function testSharedTypedArrayMethods() {
    var v = new Int32Array(b);
    for ( var i=0 ; i < v.length ; i++ )
        v[i] = i;

    // Rudimentary tests - they don't test any boundary conditions

    // subarray
    var w = v.subarray(10, 20);
    assert.sameValue(w.length, 10);
    for ( var i=0 ; i < w.length ; i++ )
        assert.sameValue(w[i], v[i+10]);
    for ( var i=0 ; i < w.length ; i++ )
        w[i] = -w[i];
    for ( var i=0 ; i < w.length ; i++ )
        assert.sameValue(w[i], v[i+10]);

    // copyWithin
    for ( var i=0 ; i < v.length ; i++ )
        v[i] = i;
    v.copyWithin(10, 20, 30);
    for ( var i=0 ; i < 10 ; i++ )
        assert.sameValue(v[i], i);
    for ( var i=10 ; i < 20 ; i++ )
        assert.sameValue(v[i], v[i+10]);

    // set
    for ( var i=0 ; i < v.length ; i++ )
        v[i] = i;
    v.set([-1,-2,-3,-4,-5,-6,-7,-8,-9,-10], 5);
    for ( var i=5 ; i < 15 ; i++ )
        assert.sameValue(v[i], -i+4);

    // In the following two cases the two arrays will reference the same buffer,
    // so there will be an overlapping copy.
    //
    // Case 1: Read from lower indices than are written
    v.set(v.subarray(0, 7), 1);
    assert.sameValue(v[0], 0);
    assert.sameValue(v[1], 0);
    assert.sameValue(v[2], 1);
    assert.sameValue(v[3], 2);
    assert.sameValue(v[4], 3);
    assert.sameValue(v[5], 4);
    assert.sameValue(v[6], -1);
    assert.sameValue(v[7], -2);
    assert.sameValue(v[8], -4);
    assert.sameValue(v[9], -5);

    // Case 2: Read from higher indices than are written
    v.set(v.subarray(1, 5), 0);
    assert.sameValue(v[0], 0);
    assert.sameValue(v[1], 1);
    assert.sameValue(v[2], 2);
    assert.sameValue(v[3], 3);
    assert.sameValue(v[4], 3);
    assert.sameValue(v[5], 4);
    assert.sameValue(v[6], -1);
    assert.sameValue(v[7], -2);
    assert.sameValue(v[8], -4);
    assert.sameValue(v[9], -5);
}

function testClone1() {
    var sab1 = b;
    var blob = serialize(sab1, [], {SharedArrayBuffer: 'allow'});
    var sab2 = deserialize(blob, {SharedArrayBuffer: 'allow'});
    if (typeof sharedAddress != "undefined")
	assert.sameValue(sharedAddress(sab1), sharedAddress(sab2));
}

function testClone2() {
    var sab = b;
    var ia1 = new Int32Array(sab);
    var blob = serialize(ia1, [], {SharedArrayBuffer: 'allow'});
    var ia2 = deserialize(blob, {SharedArrayBuffer: 'allow'});
    assert.sameValue(ia1.length, ia2.length);
    assert.sameValue(ia1.buffer instanceof SharedArrayBuffer, true);
    if (typeof sharedAddress != "undefined")
	assert.sameValue(sharedAddress(ia1.buffer), sharedAddress(ia2.buffer));
    ia1[10] = 37;
    assert.sameValue(ia2[10], 37);
}

// Serializing a SharedArrayBuffer should fail if we've set its flag to 'deny' or if
// the flag is bogus or if the flag is not set to 'allow' explicitly

function testNoClone() {
    // This just tests the API in serialize()
    assertThrowsInstanceOf(() => serialize(b, [], {SharedArrayBuffer: false}), Error);

    // This tests the actual cloning functionality - should fail
    assertThrowsInstanceOf(() => serialize(b, [], {SharedArrayBuffer: 'deny'}), TypeError);

    // This tests that cloning a SharedArrayBuffer is not allowed by default
    assertThrowsInstanceOf(() => serialize(b), TypeError);

    // Ditto - should succeed
    assert.sameValue(typeof serialize(b, [], {SharedArrayBuffer: 'allow'}), "object");

    let blob = serialize(b, [], {SharedArrayBuffer: 'allow'});
    // This just tests the API in deserialize()
    assertThrowsInstanceOf(() => deserialize(blob, {SharedArrayBuffer: false}), Error);

    // This tests the actual cloning functionality - should fail
    assertThrowsInstanceOf(() => deserialize(blob, {SharedArrayBuffer: 'deny'}), TypeError);

    // This tests that cloning a SharedArrayBuffer is not allowed by default
    assertThrowsInstanceOf(() => deserialize(blob), TypeError);

    // Ditto - should succeed
    assert.sameValue(typeof deserialize(blob, {SharedArrayBuffer: 'allow'}), "object");
}

function testRedundantTransfer() {
    // Throws TypeError in the shell, DataCloneError in the browser.
    assertThrowsInstanceOf(() => {
	var sab1 = b;
	var blob = serialize(sab1, [sab1], {SharedArrayBuffer: 'allow'});
    }, TypeError);
}

function testApplicable() {
    var sab = b;
    var x;

    // Just make sure we can create all the view types on shared memory.

    x = new Int32Array(sab);
    assert.sameValue(x.length, sab.byteLength / Int32Array.BYTES_PER_ELEMENT);
    x = new Uint32Array(sab);
    assert.sameValue(x.length, sab.byteLength / Uint32Array.BYTES_PER_ELEMENT);

    x = new Int16Array(sab);
    assert.sameValue(x.length, sab.byteLength / Int16Array.BYTES_PER_ELEMENT);
    x = new Uint16Array(sab);
    assert.sameValue(x.length, sab.byteLength / Uint16Array.BYTES_PER_ELEMENT);

    x = new Int8Array(sab);
    assert.sameValue(x.length, sab.byteLength / Int8Array.BYTES_PER_ELEMENT);
    x = new Uint8Array(sab);
    assert.sameValue(x.length, sab.byteLength / Uint8Array.BYTES_PER_ELEMENT);

    // Though the atomic operations are illegal on Uint8ClampedArray and the
    // float arrays, they can still be used to create views on shared memory.

    x = new Uint8ClampedArray(sab);
    assert.sameValue(x.length, sab.byteLength / Uint8ClampedArray.BYTES_PER_ELEMENT);

    x = new Float32Array(sab);
    assert.sameValue(x.length, sab.byteLength / Float32Array.BYTES_PER_ELEMENT);
    x = new Float64Array(sab);
    assert.sameValue(x.length, sab.byteLength / Float64Array.BYTES_PER_ELEMENT);
}

if (this.SharedArrayBuffer) {
    testSharedArrayBuffer();
    testSharedTypedArray();
    testSharedTypedArrayMethods();
    testClone1();
    testClone2();
    testNoClone();
    testRedundantTransfer();
    testApplicable();
}

