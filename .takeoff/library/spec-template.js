const { camelCase, kebabCase } = require("../__helpers.js");

module.exports = name => `import { ${camelCase(name)} } from "./${kebabCase(name)}";

describe("${kebabCase(name)}", () => {
  it("works as intended", () => {
    expect(${camelCase(name)}).not.toThrow();
  });
});
`;
