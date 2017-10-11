/* global require process __dirname global */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const env = (process.env.NODE_ENV || 'dev').trim();
const helmet = require('helmet');

const mongoose = require('mongoose');
const db = require('./db.js'); // insert your own db conection string
mongoose.Promise = global.Promise;
mongoose.connect(db.connStr, {
    useMongoClient: true
});
const port = process.env.PORT || 3000;

if(env !== 'production') {
    const config = require('./webpack.config');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const userApi = require('./api/users');
const loginApi = require('./api/login');
app.use('/api/users', userApi);
app.use('/api/login', loginApi);
// app.set('view engine', 'ejs');
// app.use('/style', express.static(path.join(__dirname, 'style')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, (error) => {
    if (error)
        console.log(error);
    else
        console.log('Listening on port ', port);
});