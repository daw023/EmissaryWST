/**
 * @author Anthony Altieri on 6/4/17.
 * 
 */
var path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var parts = require('./libs/parts');
var pkg = require('./package.json');
var DashboardPlugin = require('webpack-dashboard/plugin');

var PATHS = {
  app: path.join(__dirname, 'src/index.js'),
  dist: path.join(__dirname, 'dist'),
  style: path.join(__dirname, 'src/style/style.scss'),
  img: path.join(__dirname, 'src/img'),
  outputCss: path.join(__dirname, 'dist', '[name]-[contenthash].css')
};

var common = {
  entry: {
    style: PATHS.style,
    app: [
      'babel-polyfill',
      PATHS.app
    ],
  },
  output: {
    path: PATHS.dist,
    publicPath: '/static/',
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /(\.js$)/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      }
    ]
  }
};

console.log('Beginning Webpack!');
console.log('Using package.json script: ' + process.env.npm_lifecycle_event);
console.log('NODE_ENV: ' + process.env.NODE_ENV);
console.log('\n')

var config;
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'cheap-eval-source-map',
        plugins: [
          new HtmlWebpackPlugin({
            title: 'Emissary',
            filename: 'index.html',
            template: 'template.ejs'
          }),
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
          }),
        ],
        output: {
          path: PATHS.dist,
          filename: '[name].[hash].js',
          chunkFilename: '[chunkhash].js',
        }
      },
      parts.clean(PATHS.dist),
      // parts.setupBabel(PATHS.app),
      parts.setupImg(PATHS.img),
      parts.setupFonts(),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.setupJSON(),
      parts.setupMp3(),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
      parts.extractCSS(PATHS.outputCss)
      //parts.minify()
    );
    break;

  default:
    config = merge(
      common,
      {
        entry: [
          'babel-polyfill',
          'webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          PATHS.app
        ],
        plugins: [
          new HtmlWebpackPlugin({
            title: 'Emissary',
            filename: 'index.html',
            template: 'template.ejs'
          }),
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('development')
            }
          }),
          new webpack.HotModuleReplacementPlugin()
        ],
        devtool: 'eval-source-map',
        output: {
          path: PATHS.dist,
          filename: 'app.bundle.js',
          // chunkFilename: '[chunkhash].js',
        }
      },
      parts.setupFonts(),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT || 3000,
      }),
      parts.setupCSS(PATHS.style),
      parts.setupMp3(),
      parts.setupImg(),
      parts.setupJSON()
    );
    break;
}

module.exports = validate(config, {
  quiet: false
});

