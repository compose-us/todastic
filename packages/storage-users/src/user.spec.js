const { createUserModel } = require("./user.js");
const { initDatabase } = require("@todastic/storage-mongo");
const config = require("@todastic/config");

describe("User", () => {
  let User;
  let mongoose;

  beforeAll(async () => {
    const db = await initDatabase({ config, logger: console });
    mongoose = db.mongoose;
    User = createUserModel({ mongoose });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("is invalid without 'username'", testWithout("username"));

  it("is invalid without 'password'", testWithout("password"));

  it("is able to detect bad email addresses", done => {
    let user = new User({ username: "berti", password: "asWell", email: "not@fancy" });
    user.validate(err => {
      expect(err.errors.email).toBeDefined();
      done();
    });
  });

  function testWithout(field) {
    return done => {
      let hash = { username: "berti", password: "soSecre7" };
      delete hash[field];
      let user = new User(hash);
      user.validate(err => {
        expect(err.errors[field]).toBeDefined();
        done();
      });
    };
  }
});
