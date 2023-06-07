const DEV_SERVER_PORT = 3000;

const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const isDevelop = process.env.NODE_ENV == 'development';

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  name: 'client',
  target: 'web',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    port: DEV_SERVER_PORT,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'space-chat',
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin(),

  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.test.ts$/,
        exclude: /(node_modules)/,
        use: 'mocha-loader',
      },
      {
        test: /\.(svg|png|jpg|jpeg|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  devtool: isDevelop ? 'source-map' : false,
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.scss'],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
