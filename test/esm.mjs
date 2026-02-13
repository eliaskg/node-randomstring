import assert from "assert";
import randomstring from "../dist/index.mjs";
import { generate } from "../dist/index.mjs";

describe("ESM import", function() {

  it("default export has generate", function() {
    assert.equal(typeof randomstring.generate, "function");
  });

  it("named export generate works", function() {
    assert.equal(typeof generate, "function");
  });

  it("default export generate returns a string", function() {
    var result = randomstring.generate();
    assert.equal(typeof result, "string");
    assert.equal(result.length, 32);
  });

  it("named generate returns a string", function() {
    var result = generate();
    assert.equal(typeof result, "string");
    assert.equal(result.length, 32);
  });

  it("generate accepts options", function() {
    var result = generate({ length: 10, charset: "numeric" });
    assert.equal(result.length, 10);
    assert.equal(result.search(/\D/), -1);
  });

  it("generate works with callback", function(done) {
    generate({ length: 16 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(typeof result, "string");
      assert.equal(result.length, 16);
      done();
    });
  });
});
