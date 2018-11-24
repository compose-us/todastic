const { camelCase } = require("../__helpers.js");

module.exports = name => `export const ${camelCase(name)} = () => {
  throw new Error("library ${name} is not implemented");
};`;
