const request = require("supertest");
const startApp = require("./app.js");
const logger = require("@todastic/logging");
const { when } = require("jest-when");

describe("todastic api", () => {
  let app;
  const User = jest.fn();
  const session = (req, res, next) => {
    next();
  };

  beforeAll(() => {
    const config = { get: jest.fn() };
    when(config.get)
      .calledWith("secret")
      .mockReturnValue("foo");
    app = startApp({ session, logger, User });
  });

  describe("not logged in", () => {
    it("responds with 401 if not logged in", done => {
      request(app)
        .get("/login-status")
        .then(response => {
          expect(response.statusCode).toBe(401);
          done();
        });
    });
  });
});
