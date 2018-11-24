import util from "util";
import initStoryshots from "@storybook/addon-storyshots";
import registerRequireContext from "babel-plugin-require-context-hook/register";
import "jest";

// Storybook uses require.context() - we need to replace it for Jest
registerRequireContext();

// We need to catch proptype warnings in the tests.

// Keep a reference to the original console methods.
/* eslint-disable no-console */
const consoleWarn = console.warn;
const consoleError = console.error;

function logToError(format, ...args) {
  throw new Error(util.format(format, ...args));
}

beforeEach(() => {
  console.warn = logToError;
  console.error = logToError;
});

afterEach(() => {
  console.warn = consoleWarn;
  console.error = consoleError;
});
/* eslint-enable no-console */

initStoryshots({
  configPath: "config/storybook/config.ts"
});
