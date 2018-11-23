const path = require("path");

module.exports = {
  coverageDirectory: "coverage",
  rootDir: path.resolve(__dirname, "../../"),
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["<rootDir>/src/**/?(*.)spec.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "^.+\\.ts$": "<rootDir>/node_modules/babel-jest"
  },
  verbose: true
};
