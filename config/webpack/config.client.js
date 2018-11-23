const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ extractStyles = true } = {}) => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";
  const isDevelopment = !isProduction;

  return {
    mode: env,
    bail: isProduction,
    target: "web",
    entry: {
      client: path.resolve(__dirname, `../../src/client/index.ts`)
    },
    output: {
      path: path.resolve(__dirname, `../../dist/client`),
      // chunkFilename: "static/js/[name].chunk.js",
      publicPath: "./",
      filename: "[name].js"
    },
    optimization: {
      ...(isProduction
        ? {
            splitChunks: {
              chunks: "all",
              name: true
            },
            runtimeChunk: true
          }
        : {})
    },
    module: {
      rules: [
        {
          test: /\.(js|tsx?)$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.scss$/,
          use: [
            extractStyles
              ? MiniCssExtractPlugin.loader
              : {
                  loader: "style-loader",
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
                resources: [path.resolve(__dirname, `../../src/client/style/base.scss`)]
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2?)$/,
          use: "file-loader"
        },
        {
          test: /\.svg$/,
          issuer: /\.ts$/, // Prevent usage of icon sprite outside of ts
          use: [
            {
              loader: "svg-sprite-loader"
            },
            {
              loader: "svgo-loader"
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: "file-loader"
        }
      ]
    },
    resolve: {
      extensions: [".js", ".json", ".ts", ".tsx"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, `../../src/client/index.html`)
      }),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env)
        }
      }),
      new CaseSensitivePathsPlugin()
    ],
    devtool: isDevelopment ? "eval-source-map" : "source-map"
  };
};
