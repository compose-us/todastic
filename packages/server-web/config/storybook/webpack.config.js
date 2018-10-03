const defaultConfig = require("../webpack/config.js");

module.exports = (baseConfig, _env, _defaultConfig) => {
  const config = defaultConfig();

  baseConfig.module = {
    ...baseConfig.module,
    ...config.module,
    rules: config.module.rules
  };

  return baseConfig;
};
