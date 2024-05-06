// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
flags:
- noStrict
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/
 */

var gTestfile = "setImmutablePrototype.js";
//-----------------------------------------------------------------------------
var BUGNUMBER = 1052139;
var summary =
  "Implement JSAPI and a shell function to prevent modifying an extensible " +
  "object's [[Prototype]]";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

if (typeof evaluate !== "function")
{
  // Not totally faithful semantics, but approximately close enough for this
  // test's purposes.
  evaluate = eval;
}

var usingRealSetImmutablePrototype = true;

if (typeof setImmutablePrototype !== "function")
{
  usingRealSetImmutablePrototype = false;

  if (typeof SpecialPowers !== "undefined")
  {
    setImmutablePrototype =
      SpecialPowers.Cu.getJSTestingFunctions().setImmutablePrototype;
  }
}

if (typeof wrap !== "function")
{
  // good enough
  wrap = function(x) { return x; };
}

function setViaProtoSetter(obj, newProto)
{
  var setter =
    Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
  setter.call(obj, newProto);
}

function checkPrototypeMutationFailure(obj, desc)
{
  var initialProto = Object.getPrototypeOf(obj);

  // disconnected from any [[Prototype]] chains for use on any object at all
  var newProto = Object.create(null);

  function tryMutate(func, method)
  {
    try
    {
      func(obj, newProto);
      throw new Error(desc + ": no error thrown, prototype " +
                      (Object.getPrototypeOf(obj) === initialProto
                       ? "wasn't"
                       : "was") +
                      " changed");
    }
    catch (e)
    {
      // Note: This is always a TypeError from *this* global object, because
      //       Object.setPrototypeOf and the __proto__ setter come from *this*
      //       global object.
      assert.sameValue(e instanceof TypeError, true,
               desc + ": should have thrown TypeError setting [[Prototype]] " +
               "via " + method + ", got " + e);
      assert.sameValue(Object.getPrototypeOf(obj), initialProto,
               desc + ": shouldn't observe [[Prototype]] change");
    }
  }

  tryMutate(Object.setPrototypeOf, "Object.setPrototypeOf");
  tryMutate(setViaProtoSetter, "__proto__ setter");
}

function runNormalTests(global)
{
  if (typeof setImmutablePrototype !== "function")
  {
    print("no testable setImmutablePrototype function available, skipping tests");
    return;
  }

  // regular old object, non-null [[Prototype]]

  var emptyLiteral = global.evaluate("({})");
  assert.sameValue(setImmutablePrototype(emptyLiteral), true);
  checkPrototypeMutationFailure(emptyLiteral, "empty literal");

  // regular old object, null [[Prototype]]

  var nullProto = global.Object.create(null);
  assert.sameValue(setImmutablePrototype(nullProto), true);
  checkPrototypeMutationFailure(nullProto, "nullProto");

  // Shocker: SpecialPowers's little mind doesn't understand proxies.  Abort.
  if (!usingRealSetImmutablePrototype)
    return;

  // direct proxies

  var emptyTarget = global.evaluate("({})");
  var directProxy = new global.Proxy(emptyTarget, {});
  assert.sameValue(setImmutablePrototype(directProxy), true);
  checkPrototypeMutationFailure(directProxy, "direct proxy to empty target");
  checkPrototypeMutationFailure(emptyTarget, "empty target");

  var anotherTarget = global.evaluate("({})");
  var anotherDirectProxy = new global.Proxy(anotherTarget, {});
  assert.sameValue(setImmutablePrototype(anotherTarget), true);
  checkPrototypeMutationFailure(anotherDirectProxy, "another direct proxy to empty target");
  checkPrototypeMutationFailure(anotherTarget, "another empty target");

  var nestedTarget = global.evaluate("({})");
  var nestedProxy = new global.Proxy(new Proxy(nestedTarget, {}), {});
  assert.sameValue(setImmutablePrototype(nestedProxy), true);
  checkPrototypeMutationFailure(nestedProxy, "nested proxy to empty target");
  checkPrototypeMutationFailure(nestedTarget, "nested target");

  // revocable proxies

  var revocableTarget = global.evaluate("({})");
  var revocable = global.Proxy.revocable(revocableTarget, {});
  assert.sameValue(setImmutablePrototype(revocable.proxy), true);
  checkPrototypeMutationFailure(revocableTarget, "revocable target");
  checkPrototypeMutationFailure(revocable.proxy, "revocable proxy");

  assert.sameValue(revocable.revoke(), undefined);
  try
  {
    setImmutablePrototype(revocable.proxy);
    throw new Error("expected to throw on revoked proxy");
  }
  catch (e)
  {
    // Note: In the cross-compartment case, this is a TypeError from |global|,
    //       because the proxy's |setImmutablePrototype| method is what actually
    //       throws here. That's why we check for TypeError from either global.
    //       (Usually the method simply sets |*succeeded| to false and the
    //       caller handles or throws as needed after that.  But not here.)
    assert.sameValue(e instanceof global.TypeError || e instanceof TypeError, true,
             "expected TypeError, instead threw " + e);
  }

  var anotherRevocableTarget = global.evaluate("({})");
  assert.sameValue(setImmutablePrototype(anotherRevocableTarget), true);
  checkPrototypeMutationFailure(anotherRevocableTarget, "another revocable target");

  var anotherRevocable = global.Proxy.revocable(anotherRevocableTarget, {});
  checkPrototypeMutationFailure(anotherRevocable.proxy, "another revocable target");

  assert.sameValue(anotherRevocable.revoke(), undefined);
  try
  {
    var rv = setImmutablePrototype(anotherRevocable.proxy);
    throw new Error("expected to throw on another revoked proxy, returned " + rv);
  }
  catch (e)
  {
    // NOTE: Again from |global| or |this|, as above.
    assert.sameValue(e instanceof global.TypeError || e instanceof TypeError, true,
             "expected TypeError, instead threw " + e);
  }
}

var global = this;
runNormalTests(global); // same-global

if (typeof newGlobal === "function")
{
  var otherGlobal = newGlobal();
  var subsumingNothing = newGlobal({ principal: 0 });
  var subsumingEverything = newGlobal({ principal: ~0 });

  runNormalTests(otherGlobal); // cross-global
  runNormalTests(subsumingNothing);
  runNormalTests(subsumingEverything);
}

/******************************************************************************/

print("Tests complete");
