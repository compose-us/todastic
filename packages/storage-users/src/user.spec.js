const User = require("./user.js");

describe("User", () => {

  it("has a username", () => {
    let user = new User({ username: "bert" });
    expect(user.username).toBeDefined();
  });

  describe("with an existing user", () => {
    xit("returns true if the password is the same", (done) => {
      let user = new User({ username: "bla", password: "soSecre7" });
      user.save();
      function callback(err, isMatch) {
        expect(isMatch).toBeTruthy();
        done();
      };
      user.validatePassword("soSecre7", callback);
    });

    xit("returns false if the password is not the same", (done) => {
      let user = new User({ username: "bla", password: "soSecre7" });
      user.save();
      function callback(err, isMatch) {
        expect(isMatch).toBeFalsy();
        done();
      };
      user.validatePassword("NotsoSecre7", callback);
    });
  });

});
