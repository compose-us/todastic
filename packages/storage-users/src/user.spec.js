const User = require("./user.js");

describe("User", () => {

  it("has a username", () => {
    let user = new User({ username: "bert" });
    expect(user.username).toBeDefined();
  });

  it("returns true if the password is the same", () => {
    let user = new User({ password: "soSecre7" });
    expect(user.validatePassword("soSecre7")).toBeTruthy();
  });

  it("returns false if the password is not the same", () => {
    let user = new User({ password: "soSecre7" });
    expect(user.validatePassword("NotsoSecre7")).toBeFalsy();
  });

});
