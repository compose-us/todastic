const config = require("./unit.config.js");

module.exports = {
  ...config,
  roots: ["<rootDir>/src/client/lib", "<rootDir>/src/common/lib"]
};
