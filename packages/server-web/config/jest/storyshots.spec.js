import path from "path";
import util from "util";
import initStoryshots from "@storybook/addon-storyshots";
import registerRequireContext from "babel-plugin-require-context-hook/register";

// To find all the stories, storybook uses require.context(). The
// following line replaces this in test with another function, using
// the Node APIs to find files.
registerRequireContext();

// We need to catch proptype warnings in the tests.

/* eslint-disable no-console */
const consoleWarn = console.warn;
const consoleError = console.error;
const setConsoles = (warn, error) => () => {
  console.warn = warn;
  console.error = error;
};
beforeEach(setConsoles(logToError, logToError));
afterEach(setConsoles(consoleWarn, consoleError));
/* eslint-enable no-console */

function logToError(...args) {
  throw new Error(util.format(...args));
}

initStoryshots({
  configPath: path.resolve(__dirname, "../storybook/config.js")
});
