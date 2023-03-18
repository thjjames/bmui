const path = require("path");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  entry: {
    main: "./src/index",
  },
  output: {
    path: path.resolve(__dirname, "../umd"),
    filename: "bmui.min.js",
    chunkFilename: "[name].chunk.js",
    library: "bmui",
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true,
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [new CleanWebpackPlugin()],
});
