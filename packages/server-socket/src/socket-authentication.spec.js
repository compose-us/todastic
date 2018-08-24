const socketAuthentication = require("./socket-authentication.js");

describe("socketAuthentication", () => {
  it("returns an error if no session is available", () => {
    const socket = { request: {} };
    const next = jest.fn();
    const User = jest.fn();
    socketAuthentication({ User })(socket, next);
    expect(next).toHaveBeenCalledWith(new Error("Authentication error"));
  });

  it("returns an error if the user doesn't have a session", () => {
    const User = {
      findById: jest.fn((userId, cb) => {
        cb(null, null);
      })
    };
    const socket = { request: { session: { passport: { user: "507f1f77bcf86cd799439011" } } } };
    const next = jest.fn();
    socketAuthentication({ User })(socket, next);
    expect(next).toHaveBeenCalledWith(new Error("No user found"));
  });

  it("handles Mongo errors", () => {
    const User = {
      findById: jest.fn((userId, cb) => {
        cb(new Error("mongo going crazy, sorry"), null);
      })
    };
    const socket = { request: { session: { passport: { user: "507f1f77bcf86cd799439011" } } } };
    const next = jest.fn();
    socketAuthentication({ User })(socket, next);
    expect(next).toHaveBeenCalledWith(new Error("Database error"));
  });

  it("works correctly with a session and a user", () => {
    const User = {
      findById: jest.fn((userId, cb) => {
        cb(null, {
          active: true,
          _id: "507f1f77bcf86cd799439011",
          last_updated: "2018-08-02T11:34:41.622Z",
          created: "2018-08-02T11:34:41.623Z",
          username: "userA",
          password: "blablub",
          __v: 0
        });
      })
    };
    const socket = { request: { session: { passport: { user: "507f1f77bcf86cd799439011" } } } };
    const next = jest.fn();
    socketAuthentication({ User })(socket, next);
    expect(next).toMatchSnapshot();
  });
});
