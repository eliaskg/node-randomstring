"use strict";

var assert = require("assert");

describe("CJS require", function() {

  it("exports generate as a named export", function() {
    var randomstring = require("..");
    assert.equal(typeof randomstring.generate, "function");
  });

  it("generate returns a string", function() {
    var randomstring = require("..");
    var result = randomstring.generate();
    assert.equal(typeof result, "string");
    assert.equal(result.length, 32);
  });

  it("generate accepts options", function() {
    var randomstring = require("..");
    var result = randomstring.generate({ length: 10, charset: "numeric" });
    assert.equal(result.length, 10);
    assert.equal(result.search(/\D/), -1);
  });

  it("generate works with callback", function(done) {
    var randomstring = require("..");
    randomstring.generate({ length: 16 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(typeof result, "string");
      assert.equal(result.length, 16);
      done();
    });
  });

  it("default export contains generate", function() {
    var randomstring = require("..");
    assert.equal(typeof randomstring.default, "object");
    assert.equal(typeof randomstring.default.generate, "function");
  });
});
