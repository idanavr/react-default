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

const mongoose = require('mongoose');
const dbConnString = config.connStr;
mongoose.Promise = global.Promise;
mongoose.connect(dbConnString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).catch(error => {
    logger.error(error);
});
const port = process.env.PORT || config.port;

// webpack setting with hot reload
if (env === 'development') {
    const webpackConfig = require('./settings/webpack.config.dev');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const devMiddleware = webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: webpackConfig.output.publicPath });
    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use(helmet());
app.use(bodyParser.json());
app.use(compression());

setRouting(app);
// app.set('view engine', 'ejs');
if (!module.parent) {
    app.listen(port, (error) => {
        if (error)
            logger.error(error);
        else
            logger.info(`Listening on port ${port}`);
    });
}