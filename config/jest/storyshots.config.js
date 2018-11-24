const config = require('./base.config.js');

module.exports = {
  ...config,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/config/jest/storyshots.spec.ts']
};
