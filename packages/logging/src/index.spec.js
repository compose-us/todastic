const { initLogger } = require("./index.js");

const logger = initLogger();

describe("logger", () => {
  it("doesn't throw an error when we log something", () => {
    expect(() => logger.info("test, obviously")).not.toThrow();
  });
});
