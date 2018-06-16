module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/**/*.{js}",
    "!**/node_modules/**",
    "!**/*.config.js",
    "!**/server-web/src/client/**/*.js"
  ],
  roots: ["packages/", "tests/"]
};
