// You can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

const createConfig = require('../webpack/config.client.js');

module.exports = (baseConfig, _env, _defaultConfig) => {
  const config = createConfig({
    extractStyles: false
  });

  baseConfig.module.rules = config.module.rules;

  baseConfig.plugins = [...baseConfig.plugins, ...config.plugins];
  baseConfig.resolve.extensions = [
    ...baseConfig.resolve.extensions,
    ...config.resolve.extensions
  ];

  baseConfig.resolve.alias = config.resolve.alias;

  return baseConfig;
};
