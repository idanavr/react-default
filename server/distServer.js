const express = require('express');
const app = express();
module.exports = app;
const config  = require('./config/config'); 
global.config = config;
const setRouting = require('./config/routing');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const mongoose = require('mongoose');
const dbConnString = config.connStr;
mongoose.Promise = global.Promise;
mongoose.connect(dbConnString, {
    useMongoClient: true
});
const port = process.env.PORT || config.port;

app.use(helmet());
app.use(bodyParser.json());
app.use(compression());

setRouting(app);

if (!module.parent) {
    app.listen(port, (error) => {
        if (error)
            console.log(error);
        else
            console.log('Listening on port ', port);
    });
}