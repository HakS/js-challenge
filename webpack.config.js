const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const stylesSettings = (modularize) => {
  const cssLoader = {
    modules: modularize,
    sourceMap: true
  };
  if (modularize) {
    cssLoader.importLoaders = 1;
    cssLoader.localIdentName = "[name]_[local]_[hash:base64]";
  }
  const settings = [
    {
      loader: "style-loader"
    }, // creates style nodes from JS strings
    {
      loader: "css-loader", options: cssLoader
    }, // translates CSS into CommonJS
    {
      loader: "sass-loader", options: {
        sourceMap: true,
      }
    } // compiles Sass to CSS, using Node Sass by default
  ];
  return settings;
};

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
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

if (process.env.NODE_ENV === 'development') {
  webpackConfig.devtool = 'inline-source-map';
  webpackConfig.mode = 'development';
} else if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new UglifyJSPlugin({
    sourceMap: false
  }));
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }));
  
}

module.exports = webpackConfig;
