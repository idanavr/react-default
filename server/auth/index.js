const utils = require('./utils');
const JWTStrategy = require('./strategies/jwt');

const initializeAuthentication = () => {
    utils.setup();

    JWTStrategy.strategy();
};

module.exports = { utils, initializeAuthentication };