const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.[contenthash].js",
  },
  mode: "production",
  devtool: false,
  devServer: {
    historyApiFallback: true,
    port: 3000,
    static: path.resolve(__dirname, "./dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["index"],
      inject: "body",
      favicon: "../public/W2MHUA6y.ico",
      minify: true,
    }),
  ],
};
