const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = () => {
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
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"]
        },
        {
          test: /\.svg$/,
          issuer: /\.vue$/, // Prevent usage of icon sprite outside of vue
          include: [path.resolve(__dirname, "../../src/asset/icon"), path.resolve(__dirname, "../../src/asset/image")],
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
          include: [path.resolve(__dirname, "../../src/asset/image")],
          use: "file-loader"
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  };
};
