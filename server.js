/* eslint-disable */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const env = (process.env.NODE_ENV || 'dev').trim();
const mongoose = require('mongoose');
const db = require('./db.js'); // insert your own db conection string
mongoose.connect(db.connStr, {
    useMongoClient: true
});
let conn = mongoose.connection;
mongoose.model('users', {first_name: String});

const port = process.env.PORT || 3000;

if(env !== 'production') {
    const config = require('./webpack.config');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler, {log:console.log}));
}

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// app.set('view engine', 'ejs');
// app.use('/style', express.static(path.join(__dirname, 'style')));

app.get("/api/users", (req, res) => {
    mongoose.model('users').find((err, users) => {
        res.send(users);
    })
});

app.post("/api/users", (req, res) => {
    if (req.body) {
        if (req.body.firstName && req.body.lastName && req.body.email && (req.body.gender === 'male' || req.body.gender === 'female')) {
            conn.collection('users').insert({ first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email, gender: req.body.gender })
                .then((result) => {
                    res.status(201);
                    res.send(result);
                });
        }
        else {
            res.status(400);
            res.end();
        }
    }
    else {
        res.status(400);
        res.end();
    }
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, error => {
    if (error)
        console.log(error);
    else
        console.log('Listening on port ', port);
})