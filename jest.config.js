module.exports = {
  testURL: "http://localhost",
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/**/*.{js}",
    "!**/node_modules/**",
    "!**/*.config.js",
    "!**/service/**",
    "!**/dist/**"
  ],
  roots: ["tests/"]
};
