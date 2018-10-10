const createConfig = require("../webpack/config.js");

module.exports = (baseConfig, _env, _defaultConfig) => {
  const config = createConfig({
    extractStyles: false
  });

  baseConfig.module = {
    ...baseConfig.module,
    ...config.module,
    rules: config.module.rules
  };

  return baseConfig;
};
