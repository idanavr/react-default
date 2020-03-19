const passport = require('passport');
const passportJWT = require('passport-jwt');

const { getUserById } = require('../../BL/users');
const { signToken } = require('../utils');
const { jwtKey } = global.config;

const JWTStrategy = passportJWT.Strategy;

const strategy = () => {
    const strategyOptions = {
        jwtFromRequest: (req) => req.cookies.jwt,
        secretOrKey: jwtKey,
        passReqToCallback: true,
    };

    const verifyCallback = (req, jwtPayload, cb) =>
        getUserById(jwtPayload.data.id).then((user) => {
            req.user = user;
            return cb(null, user); // cb first param is for error
        })
            .catch((err) => cb(err));

    passport.use(new JWTStrategy(strategyOptions, verifyCallback));
};

const login = (req, user) =>
    new Promise((resolve, reject) => {
        req.login(user, { session: false }, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(signToken(user));
        });
    });

module.exports = { strategy, login };