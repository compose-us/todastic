const { kebabCase, prettify } = require("../__helpers.js");
const indexTemplate = require("./index-template.js");
const libTemplate = require("./lib-template.js");
const specTemplate = require("./spec-template.js");

module.exports = {
  requiredProps: [
    {
      message: "Name of the new library (library-name)?",
      name: "libraryName",
      type: "input"
    }
  ],
  run: props => ({
    files: [
      {
        filename: `src/lib/${kebabCase(props.libraryName)}/index.ts`,
        template: indexTemplate(props.libraryName)
      },
      {
        filename: `src/lib/${kebabCase(props.libraryName)}/${kebabCase(props.libraryName)}.ts`,
        template: libTemplate(props.libraryName)
      },
      {
        filename: `src/lib/${kebabCase(props.libraryName)}/${kebabCase(props.libraryName)}.spec.ts`,
        template: specTemplate(props.libraryName)
      }
    ].map(prettify)
  })
};
