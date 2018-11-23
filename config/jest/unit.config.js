const config = require("./base.config.js");

module.exports = {
  ...config,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
};
