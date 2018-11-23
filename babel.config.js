module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions"]
        },
        useBuiltIns: "entry"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    // "@babel/plugin-proposal-unicode-property-regex",
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
