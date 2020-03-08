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
      filename: 'index.js',
    },
    plugins: [new HtmlWebpackPlugin()],
    devtool: 'source-map',
  },
  {
    mode: 'development',
    entry: './src/iframe.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'iframe.js',
    },
    plugins: [new HtmlWebpackPlugin({ filename: 'iframe.html' })],
    devtool: 'source-map',
  },
];
