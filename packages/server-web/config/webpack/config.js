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
          test: /\.scss$/,
          use: [
            extractStyles
              ? MiniCssExtractPlugin.loader
              : {
                  loader: "vue-style-loader",
                  options: {
                    sourceMap: isDevelopment
                  }
                },
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment,
                modules: true,
                localIdentName: isDevelopment ? "[path][name]__[local]" : "[hash:base64]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: isDevelopment,
                plugins: [autoprefixer({ browsers: ["last 2 versions", "ie >= 11"] })]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            },
            {
              loader: "sass-resources-loader",
              options: {
                resources: [path.resolve(__dirname, "../../src/style/config.scss")]
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          issuer: /(\.vue|\/asset\/.*\.js)$/, // Prevent usage of icon sprite outside of vue or assets
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
    ],
    stats: "errors-only"
  };
};
