const fs = require('fs');
const path = require('path');
const camelCase = require('lodash.camelcase');
const kebabCase = require('lodash.kebabcase');
const upperFirst = require('lodash.upperfirst');
const indexTemplate = require('./index-template');
const jsStatelessTemplate = require('./js-stateless-template');
const jsStatefulClassTemplate = require('./js-stateful-class-template');
const jsStatefulRecomposeTemplate = require('./js-stateful-recompose-template');
const scssTemplate = require('./scss-template');
const storyTemplate = require('./story-template');
const prettify = require('../../config/takeoff-helpers/prettify');
const insertLineSortedIntoFileMarker = require('../../config/takeoff-helpers/insert-line-sorted-into-file-marker');

const getComponentDirectories = () => {
  return fs
    .readdirSync(path.resolve(__dirname, '../../src/component'))
    .filter(item =>
      fs
        .statSync(path.resolve(__dirname, `../../src/component/${item}`))
        .isDirectory()
    );
};

module.exports = {
  requiredProps: [
    {
      message:
        'Select the parent component for inner components or (none) if you are building a regular new component',
      name: 'parentComponentName',
      type: 'list',
      choices: [{ name: '(none)', value: '.' }, ...getComponentDirectories()]
    },
    {
      message:
        'Class based (necessary when using "refs"), recompose based (recommended for components that need state and lifecycle) or function based (stateless) component?',
      name: 'componentType',
      type: 'list',
      choices: ['stateful-class', 'stateful-recompose', 'stateless']
    },
    {
      message: 'Name of the new component (component-name)?',
      name: 'componentName',
      type: 'input'
    }
  ],
  run: props => {
    const isInnerComponent = props.parentComponentName !== '.';
    return {
      files: [
        {
          filename: `src/component/${props.parentComponentName}/${kebabCase(
            props.componentName
          )}/${kebabCase(props.componentName)}.scss`,
          template: scssTemplate(props.componentName)
        },
        {
          filename: `src/component/${props.parentComponentName}/${kebabCase(
            props.componentName
          )}/${kebabCase(props.componentName)}.js`,
          template: (() => {
            switch (props.componentType) {
              case 'stateful-class':
                return jsStatefulClassTemplate(props.componentName);
              case 'stateful-recompose':
                return jsStatefulRecomposeTemplate(props.componentName);
              case 'stateless':
              default:
                return jsStatelessTemplate(props.componentName);
            }
          })()
        },
        ...(isInnerComponent
          ? [
              {
                filename: `src/component/${
                  props.parentComponentName
                }/${kebabCase(props.componentName)}/index.js`,
                template: indexTemplate(props.componentName)
              },
              {
                filename: `src/component/${props.parentComponentName}/index.js`,
                template: insertLineSortedIntoFileMarker(
                  path.resolve(
                    `src/component/${props.parentComponentName}/index.js`
                  ),
                  `export { ${upperFirst(
                    camelCase(props.componentName)
                  )} } from './${kebabCase(props.componentName)}';`
                )
              }
            ]
          : [
              {
                filename: `src/component/${props.componentName}/index.js`,
                template: indexTemplate(
                  props.componentName,
                  props.parentComponentName
                )
              }
            ]),
        {
          filename: `src/index.js`,
          template: insertLineSortedIntoFileMarker(
            'src/index.js',
            `export { ${upperFirst(
              camelCase(props.componentName)
            )} } from './component/${
              isInnerComponent
                ? props.parentComponentName
                : kebabCase(props.componentName)
            }';`
          )
        },
        {
          filename: `src/component/${props.parentComponentName}/${kebabCase(
            props.componentName
          )}/${kebabCase(props.componentName)}.story.js`,
          template: storyTemplate(
            props.componentName,
            props.parentComponentName
          )
        }
      ].map(prettify)
    };
  }
};
