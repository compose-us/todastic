const config = require("./unit.config.js");

module.exports = {
  ...config,
  roots: ["<rootDir>/src/server/lib", "<rootDir>/src/common/lib"],
  coverageThreshold: {
    "**/service/**/*.js": {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};
