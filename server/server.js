const express = require('express');
const app = express();
const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
module.exports = app;
const config = require('./settings/config');
config.env = env;
global.config = config;
const setRouting = require('./settings/routing');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const logger = new (require('./logger'))('server');

require('./settings/db-connection')
  .connect()
  .catch((error) => {
    logger.error(error);
  });
const port = process.env.PORT || config.port;

app.use(helmet());
app.use(bodyParser.json());
app.use(compression());

// there is one route in this file in addition to the function, in case of development mode
setRouting(app, env);

// webpack setting with hot reload
if (env === 'development') {
    const webpackConfig = require('./settings/webpack.config.dev');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const devMiddleware = webpackDevMiddleware(compiler);
    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler, { log: console.log }));

    app.use('*', (req, res, next) => {
        const filename = `${compiler.outputPath}/index.html`;
        devMiddleware.waitUntilValid(() => {
          compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
              next(err);
              return;
            }
            res.set('content-type','text/html');
            res.send(result);
          });
        });
      });
}

// app.set('view engine', 'ejs');
if (!module.parent) {
    app.listen(port, (error) => {
        if (error)
            logger.error(error);
        else
            logger.info(`Listening on port ${port}`);
    });
}