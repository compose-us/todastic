module.exports = {
  env: {
    test: {
      plugins: ["babel-plugin-require-context-hook"]
    }
  },
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
    "vue"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-unicode-property-regex",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true
      }
    ]
  ],
  retainLines: true
};
