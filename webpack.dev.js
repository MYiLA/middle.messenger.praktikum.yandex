/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    static: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['index'],
      inject: 'body',
      favicon: '../public/W2MHUA6y.ico',
      minify: false,
    }),
  ],
};
