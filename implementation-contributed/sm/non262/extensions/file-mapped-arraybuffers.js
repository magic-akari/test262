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
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

function viewToString(view)
{
  return String.fromCharCode.apply(null, view);
}

function test() {
    var filename = "file-mapped-arraybuffers.txt";
    var buffer = createMappedArrayBuffer(filename);
    var view = new Uint8Array(buffer);
    assert.sameValue(viewToString(view), "01234567abcdefghijkl");

    var buffer2 = createMappedArrayBuffer(filename, 8);
    view = new Uint8Array(buffer2);
    assert.sameValue(viewToString(view), "abcdefghijkl");

    var buffer3 = createMappedArrayBuffer(filename, 0, 8);
    view = new Uint8Array(buffer3);
    assert.sameValue(viewToString(view), "01234567");

    // Test detaching during subarray creation.
    var nasty = {
      valueOf: function () {
        print("detaching...");
        serialize(buffer3, [buffer3]);
        print("detached");
        return 3000;
      }
    };

    var a = new Uint8Array(buffer3);
    assertThrowsInstanceOf(() => {
        var aa = a.subarray(0, nasty);
        for (i = 0; i < 3000; i++)
            aa[i] = 17;
    }, TypeError);

    // Check that invalid sizes and offsets are caught
    assertThrowsInstanceOf(() => createMappedArrayBuffer("empty.txt", 8), RangeError);
    assertThrowsInstanceOf(() => createMappedArrayBuffer("empty.txt", 0, 8), Error);
}

if (getBuildConfiguration("mapped-array-buffer"))
    test();
