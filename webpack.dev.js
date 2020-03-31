const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  devServer: {
    // proxy: {
    //   context: ['/api'],
    //   target: 'http://127.0.0.1:3000'
    // },
  },
});
