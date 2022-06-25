const webpack = require("webpack");
const path = require('path');
const config = require('../bmui.config');
const { VueLoaderPlugin } = require('vue-loader');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_MODE': JSON.stringify(process.env.APP_MODE),
      'process.env.BUILD_TIME': JSON.stringify(new Date()),
      '__config__': JSON.stringify(config)
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        // exclude: /node_modules/, 
        use: 'vue-loader'
      }, 
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jsx?|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/, 
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(gif|jpe?g|png|webp|woff2?|svg|eot|ttf|otf)$/,
        // exclude: /node_modules/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          'vue-loader',
          require.resolve('./md-parser-loader')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }
};