const path = require('path');
const webpack = require('webpack')

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
  entry: "./src/index.ts",
  output: {
    filename: 'bundle.js',
    library: 'toShavian',
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
  ],
  performance: {
    hints: false
  },
  optimization: {
    minimize: false,
  },
};
