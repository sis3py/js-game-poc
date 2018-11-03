const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/client/index.js",
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "style",
          test: /\.(sa|sc|c)ss$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  output: {
    // change this to `bundle.js` if you want it to be outputted to the same folder as HTML
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  module: {
    rules: [
      {
        test: [/\.vert$/, /\.frag$/],
        exclude: /node_modules/,
        use: "raw-loader"
      },
      {
        test: /\.(js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./assets"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist'], { verbose: true }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebPackPlugin({
      hash: true,
      filename: path.resolve(__dirname, "dist/index.html"),
      template: path.resolve(__dirname, "src/template/template.html"),
      inject: true
    }),
    new CopyWebpackPlugin([
      { from: "src/js/client/images", to: "assets/images" },
      { from: "src/js/client/game/assets", to: "assets" }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash].css"
    })
  ]
};
