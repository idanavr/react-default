const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');

const mongoose = require('mongoose');
const db = require('./config/db.js'); // insert your own db conection string
mongoose.Promise = global.Promise;
mongoose.connect(db.connStr, {
    useMongoClient: true
});
const port = process.env.PORT || 3000;

// webpack setting with hot reload
const config = require('./config/webpack.config.dev');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: config.output.publicPath });
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler, { log: console.log }));

app.use(helmet());
app.use(bodyParser.json());

const userApi = require('./api/users');
const loginApi = require('./api/login');
app.use('/api/users', userApi);
app.use('/api/login', loginApi);
app.use(express.static(path.join(__dirname, '..', 'public')));
// app.set('view engine', 'ejs');

app.get('*', (req, res) => {
    const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/index.html`);
    res.send(htmlBuffer.toString());
});

app.listen(port, (error) => {
    if (error)
        console.log(error);
    else
        console.log('Listening on port ', port);
});