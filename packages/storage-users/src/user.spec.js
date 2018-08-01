const User = require("./user.js");

describe("User", () => {

  it("is invalid without a username", (done) => {
    let user = new User({ password: "soSecre7" });
    user.validate(function(err) {
      expect(err.errors.username).toBeDefined();
      done();
    });
  });

  it("is invalid without a password", (done) => {
    let user = new User({ username: "berti" });
    user.validate(function(err) {
      expect(err.errors.password).toBeDefined();
      done();
    });
  });

  it("is able to detect bad email addresses", (done) => {
    let user = new User({ username: "berti", password: "asWell", email: "not@fancy" });
    user.validate(function(err) {
      expect(err.errors.email).toBeDefined();
      done();
    });
  });
});
