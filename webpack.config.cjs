const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  },
  mode: 'production',
  plugins: [
     new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin()
  ],
  externals: {
    /*through2: 'through2',
    'quote-stream': 'quote-stream',
    'concat-stream': 'concat-stream',
    duplexer2: 'duplexer2',
    escodegen: 'escodegen',
    'object-inspect': 'object-inspect',
    'shallow-copy': 'shallow-copy',
    has: 'has',
    'static-module': 'static-module',
    'buffer-equal': 'buffer-equal',
    buffer: 'buffer',
    inherits: 'inherits',
    util: 'util',
    'buffer-from': 'buffer-from',
    typedarray: 'typedarray',
    falafel: 'falafel',
    estraverse: 'estraverse',
    resolve: 'resolve',
    'is-core-module': 'is-core-module',
    'process-nextick-args': 'process-nextick-args',
    isarray: 'isarray',
    events: 'events',
    'base64-js': 'base64-js',
    ieee754: 'ieee754',
    'core-util-is': 'core-util-is',
    'util-deprecate': 'util-deprecate',
    'readable-stream': 'readable-stream',
    'is-arguments': 'is-arguments',
    hasown: 'hasown',
    'is-generator-function': 'is-generator-function',
    'which-typed-array': 'which-typed-array',
    'is-typed-array': 'is-typed-array',
    esutils: 'esutils',
    'static-eval': 'static-eval',
    'path-parse': 'path-parse',
    'has-tostringtag': 'has-tostringtag',
    'call-bind': 'call-bind',
    gopd: 'gopd',
    'for-each': 'for-each',
    'available-typed-arrays': 'available-typed-arrays',
    'get-intrinsic': 'get-intrinsic',
    'function-bind': 'function-bind',
    'set-function-length': 'set-function-length',
    'is-callable': 'is-callable',
    'source-map': 'source-map',
    'merge-source-map': 'merge-source-map',
    'has-symbols': 'has-symbols',
    'has-proto': 'has-proto',
    'define-data-property': 'define-data-property',
    'has-property-descriptors': 'has-property-descriptors',*/
  }
};
