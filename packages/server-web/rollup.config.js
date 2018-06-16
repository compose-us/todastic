import VuePlugin from "rollup-plugin-vue";

export default {
  input: "src/client/client.js",
  output: {
    format: "esm",
    file: "src/dist/client.dist.js"
  },
  plugins: [VuePlugin(/* VuePluginOptions */)]
};
