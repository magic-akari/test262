// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
features: []
info: |
  needs evaluate
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

// Attempting to lexically redefine a var is a syntax error.
evaluate("var a;");
assertThrowsInstanceOf(() => evaluate("let a;"), SyntaxError);

// Attempting to lexically redefine a configurable global property that's not a
// var is okay.
this.b = 42;
assert.sameValue(b, 42);
evaluate("let b = 17;");
assert.sameValue(b, 17);

// Attempting to lexically redefine a configurable global property that wasn't
// a var initially but was later declared as one, isn't okay.
this.c = 8675309;
assert.sameValue(c, 8675309);
evaluate("var c;");
assertThrowsInstanceOf(() => evaluate("let c;"), SyntaxError);

// Attempting to lexically redefine a var added by eval code isn't okay.
assert.sameValue(typeof d, "undefined");
eval("var d = 33;");
assert.sameValue(d, 33);
assertThrowsInstanceOf(() => evaluate("let d;"), SyntaxError);

// Attempting to lexically redefine a var added by eval code, then deleted *as a
// name*, is okay.  (The |var| will add the name to the global environment
// record's [[VarNames]], but deletion will go through the global environment
// record's DeleteBinding and so will remove it.)
assert.sameValue(typeof e, "undefined");
eval("var e = 'ohia';");
assert.sameValue(e, "ohia");
delete e;
assert.sameValue(this.hasOwnProperty("e"), false);
evaluate("let e = 3.141592654;");
assert.sameValue(e, 3.141592654);

// Attempting to lexically redefine a var added by eval code, then deleted *as a
// property*, isn't okay.  (Deletion by property doesn't go through the global
// environment record's DeleteBinding algorithm, and so the name isn't removed
// from [[VarNames]].)  And it remains non-okay even if the var is subsequently
// deleted as a name, because if the property doesn't exist, it's not removed
// from [[VarNames]].  But if we add the global property again and then delete
// by name, it *will* get removed from [[VarNames]].
assert.sameValue(typeof f, "undefined");
eval("var f = 8675309;");
assert.sameValue(f, 8675309);
delete this.f;
assert.sameValue(this.hasOwnProperty("f"), false);
assertThrowsInstanceOf(() => evaluate("let f;"), SyntaxError);
delete f;
assertThrowsInstanceOf(() => evaluate("let f;"), SyntaxError);
this.f = 999;
assertThrowsInstanceOf(() => evaluate("let f;"), SyntaxError);
delete f;
evaluate("let f;");

print("Tests complete");
