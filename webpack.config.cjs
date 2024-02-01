var path = require('path');
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
  },
  resolve: {
    alias: {
        'fs': path.join(__dirname, 'node_modules/brfs'),
    }
  }
};
