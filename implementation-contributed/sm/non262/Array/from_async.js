// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
- compareArray.js
flags:
- noStrict
features: []
info: |
  needs drainJobQueue
description: |
  pending
esid: pending
---*/
// Basic Smoke Test
async function* asyncGen(n) {
  for (let i = 0; i < n; i++) {
    yield i * 2;
  }
}

let done = false;
Array.fromAsync(asyncGen(4)).then((x) => {
  assert.sameValue(Array.isArray(x), true);
  assert.sameValue(x.length, 4);
  assert.sameValue(x[0], 0);
  assert.sameValue(x[1], 2);
  assert.sameValue(x[2], 4);
  assert.sameValue(x[3], 6);
  done = true;
}
);

drainJobQueue();
assert.sameValue(done, true);

(async function () {
  class InterruptableAsyncIterator {
    count = 0
    closed = false
    throwAfter = NaN
    constructor(n, throwAfter = NaN) {
      this.count = n;
      this.throwAfter = throwAfter;
    }
    [Symbol.asyncIterator] = function () {
      return {
        iter: this,
        i: 0,
        async next() {
          if (this.i > this.iter.throwAfter) {
            throw "Exception"
          }
          if (this.i++ < this.iter.count) {
            return Promise.resolve({ done: false, value: this.i - 1 });
          }
          return Promise.resolve({ done: true, value: undefined });
        },
        async return(x) {
          this.iter.closed = true;
          return { value: x, done: true };
        }
      }
    }
  }

  var one = await Array.fromAsync(new InterruptableAsyncIterator(2));
  assert.sameValue(one.length, 2)
  assert.sameValue(one[0], 0);
  assert.sameValue(one[1], 1);

  var two = new InterruptableAsyncIterator(10, 2);
  var threw = false;
  try {
    var res = await Array.fromAsync(two);
  } catch (e) {
    threw = true;
    assert.sameValue(e, "Exception");
  }
  assert.sameValue(threw, true);
  // The iterator is not closed unless we have an abrupt completion while mapping.
  assert.sameValue(two.closed, false);

  // Test throwing while mapping: Iterator should be closed.
  var three = new InterruptableAsyncIterator(10, 9);
  threw = false;
  try {
    var res = await Array.fromAsync(three, (x) => {
      if (x > 3) {
        throw "Range"
      }
      return x;
    });
  } catch (e) {
    assert.sameValue(e, "Range");
    threw = true;
  }
  assert.sameValue(threw, true);
  assert.sameValue(three.closed, true);

  var sync = await Array.fromAsync([1, 2, 3]);
  assert.sameValue(sync.length, 3);
  assert.sameValue(sync[0], 1)
  assert.sameValue(sync[1], 2)
  assert.sameValue(sync[2], 3)

  let closed_frozen = false;
  class Frozen {
    constructor(x) {
      this.count = x;
      Object.freeze(this);
    }
    [Symbol.asyncIterator] = function () {
      return {
        iter: this,
        i: 0,
        async next() {
          if (this.i++ < this.iter.count) {
            return Promise.resolve({ done: false, value: this.i - 1 });
          }
          return Promise.resolve({ done: true, value: undefined });
        },
        async return(x) {
          // Can't use Frozen instance, becuse frozen is frozen.
          closed_frozen = true;
          return { value: x, done: true };
        }
      }
    }
  }

  // We should close the iterator when define property throws.
  // Test by defining into a frozen object. 
  var frozen = new Frozen(10);
  threw = false;
  try {
    var result = await Array.fromAsync.call(Frozen, frozen);
  } catch (e) {
    threw = true;
  }

  assert.sameValue(threw, true);
  assert.sameValue(closed_frozen, true);

})();

drainJobQueue();

(async function () {
  var badSyncIterator = {
    [Symbol.iterator]() {
      return null;
    }
  };

  var badAsyncIterator = {
    [Symbol.asyncIterator]() {
      return null;
    }
  };

  async function errorMessage(fn) {
    try {
      await fn();
    } catch (e) {
      return e.message;
    }
    throw new Error("missing error");
  }

  // Ensure Array.from and Array.fromAsync use consistent error reporting.
  var expected = await errorMessage(() => Array.from(badSyncIterator));
  var actual = await errorMessage(() => Array.fromAsync(badSyncIterator));
  assert.sameValue(actual, expected);

  // Ensure for-of iteration and Array.fromAsync use consistent error reporting.
  var expected = await errorMessage(() => { for (var _ of badSyncIterator); });
  var actual = await errorMessage(() => Array.fromAsync(badSyncIterator));
  assert.sameValue(actual, expected);

  // Ensure await for-of iteration and Array.fromAsync use consistent error reporting.
  var expected = await errorMessage(async () => { for await (var _ of badAsyncIterator); });
  var actual = await errorMessage(() => Array.fromAsync(badAsyncIterator));
  assert.sameValue(actual, expected);
})();

drainJobQueue();

(async function () {
  function* gen() {
    for (let i = 0; i < 4; ++i) {
      yield Promise.resolve(i);
    }
  };

  var array = await Array.fromAsync(gen());

  // Promise values are unwrapped via AsyncFromSyncIterator.
  assert.compareArray(array, [0, 1, 2, 3]);
})();

drainJobQueue();

(async function () {
  var badSyncIterator = {
    [Symbol.iterator]: 123,
  };

  var badAsyncIterator = {
    [Symbol.asyncIterator]: 123,
  };

  async function errorMessage(fn) {
    try {
      await fn();
    } catch (e) {
      return e.message;
    }
    throw new Error("missing error");
  }

  // Ensure Array.from and Array.fromAsync use consistent error reporting.
  var expected = await errorMessage(() => Array.from(badSyncIterator));
  var actual = await errorMessage(() => Array.fromAsync(badSyncIterator));
  assert.sameValue(actual.endsWith("is not iterable"), expected.endsWith("is not iterable"));

  // Ensure for-of iteration and Array.fromAsync use consistent error reporting.
  var expected = await errorMessage(() => { for (var _ of badSyncIterator); });
  var actual = await errorMessage(() => Array.fromAsync(badSyncIterator));
  assert.sameValue(actual.endsWith("is not iterable"), expected.endsWith("is not iterable"));

  // Ensure await for-of iteration and Array.fromAsync use consistent error reporting.
  var expected = await errorMessage(async () => { for await (var _ of badAsyncIterator); });
  var actual = await errorMessage(() => Array.fromAsync(badAsyncIterator));
  assert.sameValue(actual.endsWith("is not iterable"), expected.endsWith("is not iterable"));
})();

drainJobQueue();


var g = newGlobal();
g.asyncGen = asyncGen;
var p = g.evaluate(`
Array.fromAsync(asyncGen(4))
`)

p.then((x) => {
  assert.sameValue(x instanceof Array, false); // Should use the other global's Array.
  assert.sameValue(x instanceof g.Array, true);
})

drainJobQueue();


var g2 = newGlobal({ newCompartment: true });
g2.asyncGen = asyncGen;
var p = g2.evaluate(`
Array.fromAsync(asyncGen(4))
`)

p.then((x) => {
  assert.sameValue(x instanceof Array, false); // Should use the other global's Array.
  assert.sameValue(x instanceof g2.Array, true);
  nukeCCW(x); // this will throw if x happens to not be a CCW (it should be!)
})
drainJobQueue();

// Test having a CCW 'this' value.
g2.obj = {};
var p2 = g2.evaluate(`
Array.fromAsync.call(obj, asyncGen(4))
`)

p2.then((x) => {
  assert.sameValue(x instanceof Array, false); // Should use the other global's Array.
  assert.sameValue(x instanceof g2.Array, true);
  nukeCCW(x);
})

drainJobQueue();

// Verify user promise resolution behaviour.
var myThenCalled = false;
var obj = { then: () => { myThenCalled = true; } }
function* genO() {
  yield obj;
  return;
}

var res = Array.fromAsync(genO());
res.then((x) => {
  assert.sameValue(x[0], obj);
  assert.sameValue(myThenCalled, true);
});

drainJobQueue();

function* thrower() {
  throw new Error();
}

g2.thrower = thrower;
var p = g2.evaluate(`Array.fromAsync(thrower())`)
p.catch((e) => {
  assert.sameValue(e instanceof Error, true, "Should throw an error from the current global");
})
drainJobQueue();

p = g2.evaluate(`Array.fromAsync(thrower, 1)`);
p.catch((e) => assert.sameValue(e instanceof g2.Error, true, "Should throw error from g2"))
drainJobQueue();

