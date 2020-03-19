const passport = require('passport');
const userBL = require('../BL/users');
const jwt = require('jsonwebtoken');
const { jwtKey } = global.config;
const { cookiesSessionInSecs } = global.config;

const setup = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userBL.getUserById(id);
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });
};

const signToken = (user) =>
    jwt.sign({ data: user }, jwtKey, {
        expiresIn: cookiesSessionInSecs
    });

module.exports = { setup, signToken };