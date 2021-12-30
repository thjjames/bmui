const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    'example-desktop': './example/desktop/main.js',
    'example-mobile': './example/mobile/main.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    // publicPath: '/',
    publicPath: '/fe-bmui/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: {
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          name: 'chunks',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['chunks', 'example-desktop'],
      template: path.join(__dirname, '../example/desktop/index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['chunks', 'example-mobile'],
      template: path.join(__dirname, '../example/mobile/index.html'),
      filename: 'mobile.html'
    }),
  ]
});
