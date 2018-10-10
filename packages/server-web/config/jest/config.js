module.exports = {
  rootDir: "../../",
  testMatch: ["<rootDir>/src/**/?(*.)spec.js"],
  transform: {
    "^.+\\.svg$": "<rootDir>/config/jest/svg-transform.js",
    "^(?!.*\\.(vue|js|json|svg)$)": "<rootDir>/config/jest/file-transform.js",
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js}",
    "!**/node_modules/**",
    "!**/*.config.js",
    "!**/client/**",
    "!**/service/**",
    "!**/dist/**"
  ],
  coverageReporters: ["json"],
  coverageDirectory: "<rootDir>/../../coverage/server-web"
};
