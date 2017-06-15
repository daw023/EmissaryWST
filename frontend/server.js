/**
 * @author Anthony Altieri on 6/4/17.
 *
 * This is the webpack dev server, in order to start it (with hot-loading) all
 * you have to do is `npm start`
 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const PORT = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
}).listen(PORT, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://localhost:${PORT}`);
});