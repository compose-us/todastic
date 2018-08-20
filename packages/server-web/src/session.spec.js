const initSession = require("./session.js");
const { when } = require("jest-when");
const mongoose = require("mongoose");

describe.skip("Session", () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  it("throws error when no config is provided", () => {
    expect(() => initSession()).toThrow();
  });

  it("returns a happy little express session", () => {
    const config = { get: jest.fn() };
    when(config.get)
      .calledWith("secret")
      .mockReturnValue("foo");
    const session = initSession({ config });
    expect(session).toBeDefined();
    expect(session).not.toBeNull();
    expect(session.middleware).toBeInstanceOf(Function);
    expect(typeof session.storeName).toBe("string"); // no idea why instanceof fails
  });

	it("throws error when mongo is not available but should be", () => {
    const config = { get: jest.fn() };
    when(config.get)
      .calledWith("secret")
      .mockReturnValue("foo");
    when(config.get)
      .calledWith("sessionStore")
      .mockReturnValue("mongo");
    when(config.get)
      .calledWith("db.connectionString")
      .mockReturnValue("notAValidConnectionString");
    expect(() => initSession({ config })).toThrow();
  });

	it("defaults to in-memory session store when none selected", () => {
    const config = { get: jest.fn() };
    when(config.get)
      .calledWith("secret")
      .mockReturnValue("foo");
    const { storeName } = initSession({ config });
    expect(storeName).toBe("in-memory");
  });

	it("can use a mongo store", () => {
    const config = { get: jest.fn() };
    when(config.get)
      .calledWith("secret")
      .mockReturnValue("foo");
    when(config.get)
      .calledWith("sessionStore")
      .mockReturnValue("mongo");
    when(config.get)
      .calledWith("db.connectionString")
      .mockReturnValue("mongodb://blafoo:27017");
    const { storeName } = initSession({ config });
    expect(storeName).toBe("mongo");
  });

});
