module.exports = {
  coverageDirectory: "coverage",
  rootDir: "../../",
  testMatch: ["<rootDir>/src/**/?(*.)spec.js"],
  transform: {
    "^.+\\.svg$": "<rootDir>/config/jest/svg-transform.js",
    "^(?!.*\\.(vue|js|json|svg)$)": "<rootDir>/config/jest/file-transform.js",
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  }
};
