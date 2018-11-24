const { kebabCase, pascalCase } = require("../__helpers.js");

module.exports = name => `/* @takeoff-sorted start */
export { default as ${pascalCase(name)} } from "./${kebabCase(name)}";
/* @takeoff-sorted stop */
`;
