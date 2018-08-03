const User = require("./user.js");

describe("User", () => {

  let fields = ["username", "password"];

  for (var i = 0, len = fields.length; i < len; i++) {
    let toTest=fields[i];
    it(`is invalid without ${toTest}`, (done) => {
      let hash = { username: "berti", password: "soSecre7" };
      delete hash[toTest];
      let user = new User(hash);
      user.validate(function(err) {
        expect(err.errors[toTest]).toBeDefined();
        done();
      });
    });
  }

  it("is able to detect bad email addresses", (done) => {
    let user = new User({ username: "berti", password: "asWell", email: "not@fancy" });
    user.validate(function(err) {
      expect(err.errors.email).toBeDefined();
      done();
    });
  });
});
