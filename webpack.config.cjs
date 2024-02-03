const path = require('path');
const webpack = require('webpack')
const BomPlugin = require('webpack-utf8-bom');

module.exports = {
  module: {
    rules: [
     {
        test: /\.tsx?$/,
        loader: 'babel-loader',
     },
     {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  entry: "./src/browser.ts",
  output: {
    filename: 'bundle.js',
    library: 'transliterator',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  resolve: {
    alias: {
        'fs': path.join(__dirname, 'node_modules/brfs'),
    }
  },
  mode: 'production',
  plugins: [
     new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new BomPlugin(true),
  ],
  performance: {
    hints: false
  },
  optimization: {
    minimize: false,
  },
};
