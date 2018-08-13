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

  it("redirects to /", done => {
    request(app)
      .get("/login")
      .then(response => {
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/");
        done();
      });
  });
});
