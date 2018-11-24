const { insertSorted, kebabCase, pascalCase, prettify } = require("../__helpers.js");
const componentTemplate = require("./component-template.js");
const indexTemplate = require("./index-template.js");
const scssTemplate = require("./scss-template.js");
const storyTemplate = require("./story-template.js");

module.exports = {
  requiredProps: [
    {
      message: "Name of the new component (component-name)?",
      name: "componentName",
      type: "input"
    }
  ],
  run: props => ({
    files: [
      {
        filename: `src/client/component/${kebabCase(props.componentName)}/${kebabCase(props.componentName)}.scss`,
        template: scssTemplate(props.componentName)
      },
      {
        filename: `src/client/component/${kebabCase(props.componentName)}/${kebabCase(props.componentName)}.story.tsx`,
        template: storyTemplate(props.componentName)
      },
      {
        filename: `src/client/component/${kebabCase(props.componentName)}/${kebabCase(props.componentName)}.tsx`,
        template: componentTemplate(props.componentName)
      },
      {
        filename: `src/client/component/${kebabCase(props.componentName)}/index.ts`,
        template: indexTemplate(props.componentName)
      },
      {
        filename: "src/client/component/index.ts",
        template: insertSorted(
          "src/client/component/index.ts",
          `export { ${pascalCase(props.componentName)} } from "./${kebabCase(props.componentName)}";`
        )
      }
    ].map(prettify)
  })
};
