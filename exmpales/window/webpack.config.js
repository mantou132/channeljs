const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @type {import('webpack/declarations/WebpackOptions').WebpackOptions[]}
 */
module.exports = [
  {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin()],
    devtool: 'source-map',
  },
];
