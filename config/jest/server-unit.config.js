const config = require("./unit.config.js");

module.exports = {
  ...config,
  roots: ["<rootDir>/src/server/lib", "<rootDir>/src/common/lib"]
};
