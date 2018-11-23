module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions"]
        },
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: [
    // "@babel/plugin-proposal-unicode-property-regex",
    // "@babel/plugin-transform-typescript",
    // ["@babel/plugin-transform-modules-commonjs", { noInterop: true }],
    "@babel/plugin-syntax-dynamic-import",
    "babel-plugin-dynamic-import-node",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true
      }
    ]
  ],
  retainLines: true
};
