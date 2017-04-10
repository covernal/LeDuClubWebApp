var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./base');
var defaultSettings = require('./defaults');
var nodeCfg = require('./NodeJS');

//Postcss plugins
var autoprefixer = require('autoprefixer');
var postUrl = require('postcss-url');

var CompressionPlugin = require("compression-webpack-plugin");

var config = Object.assign({}, baseConfig, {
  entry: {
    app: [path.join(__dirname, '../src/index')],
    vendor: ['react']
  },
  devtool: 'eval',
  cache: false,
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'BROWSER': JSON.stringify(true),
        'NODE_ENV': JSON.stringify('production'),
        'REACT_WEBPACK_ENV': JSON.stringify(process.env.REACT_WEBPACK_ENV),
        'LEANCLOUD_APP_ID': JSON.stringify(process.env.LEANCLOUD_APP_ID),
        'LEANCLOUD_APP_KEY': JSON.stringify(process.env.LEANCLOUD_APP_KEY),
        'LEANCLOUD_MASTER_KEY': JSON.stringify(process.env.LEANCLOUD_MASTER_KEY)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false,
      minimize: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js')
  ],
  module: defaultSettings.getDefaultModules(),
  postcss: function (webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      autoprefixer,
      postUrl
    ];
  },
  resolve: {
    alias: {
      'react-router': defaultSettings.modulePath + '/react-router/umd/ReactRouter.min.js',
      'immutable': defaultSettings.modulePath + '/immutable/dist/immutable.min.js',
      'swiper': defaultSettings.modulePath + '/swiper/dist/js/swiper.min.js'
    }
  }
});

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '/../src'),
  exclude: /node_modules/
});

module.exports = config;
