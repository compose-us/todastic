const request = require("supertest");
const app = require("./app.js");

describe("todastic api", () => {
  it("#logout redirects to login /", done => {
    request(app)
      .post("/logout")
      .then(response => {
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/");
        done();
      });
  });

  it("responds with 401 if not logged in", done => {
    request(app)
      .get("/login-status")
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
});
