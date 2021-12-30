const { merge } = require('webpack-merge');
const webpackExampleConfig = require('./webpack.example.config.js');
const chalk = require('chalk');
const portfinder = require('portfinder');

const __webpackConfig__ = merge(webpackExampleConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    // https: true,
    host: '0.0.0.0',
    port: 8089,
    useLocalIp: true,
    disableHostCheck: true,
    open: true,
    openPage: 'fe-bmui/',
    hot: true
  },
  devtool: 'eval-source-map'
});

module.exports = new Promise((resolve, reject) => {
  const port = process.env.PORT || __webpackConfig__.devServer.port;
  portfinder.getPort({
    port,
    stopPort: port + 100
  }, function (err, newPort) {
    if (err) {
      reject(err);
    } else {
      if (port !== newPort) {
        console.log(chalk.bold.blueBright(`port ${port} is in use, use ${newPort} instead!`));
        __webpackConfig__.devServer.port = newPort;
      }
    }
    resolve(__webpackConfig__);
  });  
});