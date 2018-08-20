const { createUserModel } = require("./user.js");
const mongoose = require("mongoose");

const User = createUserModel({ mongoose });

describe("User", () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  it("is invalid without 'username'", testWithout("username"));

  it("is invalid without 'password'", testWithout("password"));

  it("is able to detect bad email addresses", done => {
    let user = new User({ username: "berti", password: "asWell", email: "not@fancy" });
    user.validate(function(err) {
      expect(err.errors.email).toBeDefined();
      done();
    });
  });
});

function testWithout(field) {
  return done => {
    let hash = { username: "berti", password: "soSecre7" };
    delete hash[field];
    let user = new User(hash);
    user.validate(function(err) {
      expect(err.errors[field]).toBeDefined();
      done();
    });
  };
}
