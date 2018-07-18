const express = require('express');
const app = express();
module.exports = app;
const config = require('./config/config');
global.config = config;
const setRouting = require('./config/routing');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const mongoose = require('mongoose');
const dbConnString = config.connStr;
mongoose.Promise = global.Promise;
mongoose.connect(dbConnString, {
    useMongoClient: true
});
const port = process.env.PORT || config.port;

// webpack setting with hot reload
const webpackConfig = require('./config/webpack.config.dev');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: webpackConfig.output.publicPath });
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler, { log: console.log }));

app.use(helmet());
app.use(bodyParser.json());

setRouting(app);
// app.set('view engine', 'ejs');
if (!module.parent) {
    app.listen(port, (error) => {
        if (error)
            console.log(error);
        else
            console.log('Listening on port ', port);
    });
}