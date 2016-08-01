const Express = require('express');
const webpack = require('webpack');

const url = require('url');
const proxy = require('proxy-middleware');

const favicon = require('serve-favicon');
const compression = require('compression');
const path = require('path');

const webpackConfig = require('./dev.config');
const compiler = webpack(webpackConfig);

const host = process.env.HOST || 'localhost';
const port = 3000;
const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = new Express();

app.use(compression());
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

// index.html is generated , and since webpack dev server uses in-memory files,
// we need to use a proxy instead of simply sending the index.html
app.use('*', proxy('http://127.0.0.1:3000'));

app.listen(port, function onAppListening(err) {
  /* eslint-disable no-console */
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening at http://localhost:%s', port);
  }
  /* eslint-enable no-console */
});
