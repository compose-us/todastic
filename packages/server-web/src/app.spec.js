const request = require("supertest");
const app = require("./app.js");

describe("todastic api", () => {
  it("redirects to login page", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(302);
        expect(response.header.location).toBe("/login");
        done();
      });
  });

  it("responds with the login page without being logged in", done => {
    request(app)
      .get("/login")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        done();
      });
  });
});
