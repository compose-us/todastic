const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = ({ extractStyles = true } = {}) => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";
  const isDevelopment = !isProduction;

  return {
    mode: env,
    bail: isProduction,
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    target: "web",
    entry: {
      client: path.resolve(__dirname, "../../src/client/client.js")
    },
    output: {
      path: path.resolve(__dirname, "../../dist"),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: { transformToRequire: { image: "xlink:href" } }
        },
        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        {
          test: /\.js$/,
          exclude: /(node_modules|dashboard|storage-events|storage-mongo)/,
          loader: "babel-loader"
        },
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
          test: /\.css$/,
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment,
                modules: true,
                localIdentName: isDevelopment ? "[path][name]__[local]" : "[hash:base64]"
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          issuer: /\.vue$/, // Prevent usage of icon sprite outside of vue
          include: [path.resolve(__dirname, "../../src/asset/icon"), path.resolve(__dirname, "../../src/asset/image")],
          use: [{ loader: "svg-sprite-loader" }, { loader: "svgo-loader" }]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          include: [path.resolve(__dirname, "../../src/asset/image")],
          use: "file-loader"
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env)
        }
      })
    ]
  };
};
