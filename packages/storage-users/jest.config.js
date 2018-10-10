module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js}", "!**/node_modules/**", "!**/*.config.js", "!**/service/**", "!**/dist/**"],
  coverageReporters: ["json"],
  coverageDirectory: "../../coverage/storage-users"
};
