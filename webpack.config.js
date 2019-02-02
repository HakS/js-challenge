const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const stylesSettings = (modularize) => {
  return [
    {
      loader: "style-loader"
    }, // creates style nodes from JS strings
    {
      loader: "css-loader", options: {
        modules: modularize,
        importLoaders: 1,
        localIdentName: "[name]_[local]_[hash:base64]",
        sourceMap: true
      }
    }, // translates CSS into CommonJS
    {
      loader: "sass-loader", options: {
        sourceMap: true,
      }
    } // compiles Sass to CSS, using Node Sass by default
  ]
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: stylesSettings(false)
      },
      {
        test: /\.module.scss$/,
        use: stylesSettings(true)
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};