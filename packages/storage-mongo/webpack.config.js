const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = () => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";
  const isDevelopment = !isProduction;

  return {
    mode: env,
    bail: isProduction,
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    target: "node",
    entry: {
      index: path.resolve(__dirname, "src/index.js")
    },
    output: {
      filename: "[name].js",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    },
    externals: [nodeExternals()]
  };
};
