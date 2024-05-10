// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

//-----------------------------------------------------------------------------
var BUGNUMBER = 1204027;
var summary =
  "Escape sequences aren't allowed in bolded grammar tokens (that is, in " +
  "keywords, possibly contextual keywords)";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var badModules =
  [
   "\\u0069mport f from 'g'",
   "i\\u006dport g from 'h'",
   "import * \\u0061s foo",
   "import {} fro\\u006d 'bar'",
   "import { x \\u0061s y } from 'baz'",

   "\\u0065xport function f() {}",
   "e\\u0078port function g() {}",
   "export * fro\\u006d 'fnord'",
   "export d\\u0065fault var x = 3;",
   "export { q } fro\\u006d 'qSupplier';",

  ];

if (typeof parseModule === "function")
{
  for (var module of badModules)
  {
    assertThrowsInstanceOf(() => parseModule(module), SyntaxError,
                           "bad behavior for: " + module);
  }
}

if (typeof Reflect.parse === "function")
{
  var twoStatementAST =
    Reflect.parse(`let x = 0;
                  export { x } /* ASI should trigger here */
                  fro\\u006D`,
                  { target: "module" });

  var statements = twoStatementAST.body;
  assert.sameValue(statements.length, 3,
           "should have two items in the module, not one ExportDeclaration");
  assert.sameValue(statements[0].type, "VariableDeclaration");
  assert.sameValue(statements[1].type, "ExportDeclaration");
  assert.sameValue(statements[2].type, "ExpressionStatement");
  assert.sameValue(statements[2].expression.name, "from");

  var oneStatementAST =
    Reflect.parse(`export { x } /* no ASI here */
                  from 'foo'`,
                  { target: "module" });

  assert.sameValue(oneStatementAST.body.length, 1);
  assert.sameValue(oneStatementAST.body[0].type, "ExportDeclaration");

  twoStatementAST =
    Reflect.parse(`export { x } from "bar"
                  /bar/g`,
                  { target: "module" });

  statements = twoStatementAST.body;
  assert.sameValue(statements.length, 2,
           "should have two items in the module, not one ExportDeclaration");
  assert.sameValue(statements[0].type, "ExportDeclaration");
  assert.sameValue(statements[1].type, "ExpressionStatement");
  assert.sameValue(statements[1].expression.type, "Literal");
  assert.sameValue(statements[1].expression.value.toString(), "/bar/g");

  twoStatementAST =
    Reflect.parse(`export * from "bar"
                  /bar/g`,
                  { target: "module" });

  statements = twoStatementAST.body;
  assert.sameValue(statements.length, 2,
           "should have two items in the module, not one ExportDeclaration");
  assert.sameValue(statements[0].type, "ExportDeclaration");
  assert.sameValue(statements[1].type, "ExpressionStatement");
  assert.sameValue(statements[1].expression.type, "Literal");
  assert.sameValue(statements[1].expression.value.toString(), "/bar/g");
}

/******************************************************************************/

print("Tests complete");
