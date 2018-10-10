module.exports = {
  testURL: "http://localhost",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js}", "!**/node_modules/**", "!**/*.config.js", "!**/service/**", "!**/dist/**"],
  coverageReporters: ["json"],
  coverageDirectory: "../../coverage/storage-events"
};
