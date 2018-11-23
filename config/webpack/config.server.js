const path = require("path");
const webpack = require("webpack");

module.exports = () => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";
  const isDevelopment = !isProduction;

  return {
    mode: env,
    bail: isProduction,
    target: "node",
    node: { __dirname: false },
    entry: {
      index: path.resolve(__dirname, "../../src/server/index.ts")
    },
    output: {
      path: path.resolve(__dirname, "../../dist/server"),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: "babel-loader"
        }
      ]
    },
    resolve: {
      extensions: [".js", ".json", ".ts"]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env)
        }
      })
    ],
    devtool: isDevelopment ? "eval-source-map" : "source-map"
  };
};
