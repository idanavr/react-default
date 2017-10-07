/* global require process __dirname */
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
const userModel = require('./models/user')

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

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// app.set('view engine', 'ejs');
// app.use('/style', express.static(path.join(__dirname, 'style')));

app.get('/api/users', (req, res) => {
    userModel.find((err, users) => {
        res.send(users);
    })
});

app.get('/api/users/:id', (req, res) => {
    if (req.params.id.length === 24) {
        userModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(400);
                res.end();
            }
            else if(!user){
                res.status(400);
                res.send('No user was found.');
            }
            else {
                res.send(user);
            }
        });
    }
    else
        res.status(400).send('Invalid id.');
});

app.post('/api/users', (req, res) => {
    let newUser = new userModel();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.gender = req.body.gender;

    newUser.save(function(err, user) {
        if(err) {
            console.log(err);
            res.status(400);
            res.end();
        }
        else {
            res.status(201);
            res.send(user);
        }
    })
});

app.delete('/api/users', (req, res) => {
    if(req.body) {
        userModel.find({ _id: req.body.id }).remove()
        .then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(400).end();
        })
    }
    else {
        res.status(400);
        res.end();
    }
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, (error) => {
    if (error)
        console.log(error);
    else
        console.log('Listening on port ', port);
})