module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: true
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-unicode-property-regex",
    "@babel/plugin-syntax-dynamic-import"
  ]
};
