module.exports = {
  rootDir: __dirname,
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js}", "!**/node_modules/**", "!**/*.config.js", "!**/service/**", "!**/dist/**"],
  coverageReporters: ["json"],
  coverageDirectory: "../../coverage/dashboard"
};
