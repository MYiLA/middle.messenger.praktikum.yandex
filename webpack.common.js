/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.ts',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '../public/images',
          to: 'images',
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new StylelintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      emitErrors: true, // по умолчанию это значение равно true для проверки ошибок CSSLint
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.test.ts$/,
        exclude: /(node_modules)/,
        use: 'mocha-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
