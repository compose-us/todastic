const { kebabCase } = require("../__helpers.js");

module.exports = name => `export * from "./${kebabCase(name)}.ts";`;
