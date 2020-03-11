const mongoose = require('mongoose');
const { env } = global.config;
const dbConnString = global.config.connStr;

const connect = async () => {
    if (env === 'test') {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = new MongoMemoryServer();
        const uri = await mongod.getUri();

        return mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
    }

    return mongoose.connect(dbConnString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
};

const disconnect = () => {
    mongoose.disconnect();
};

module.exports = { connect, disconnect };