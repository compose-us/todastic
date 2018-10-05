const config = require('./config');

module.exports = {
  ...config,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/config/jest/storyshots.spec.js']
};
