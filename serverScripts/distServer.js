const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');

const mongoose = require('mongoose');
const db = require('../config/db.js');
mongoose.Promise = global.Promise;
mongoose.connect(db.connStr, {
    useMongoClient: true
});
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.json());

const userApi = require('./api/users');
const loginApi = require('./api/login');
app.use('/api/users', userApi);
app.use('/api/login', loginApi);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, (error) => {
    if (error)
        console.log(error);
    else
        console.log('Listening on port ', port);
});