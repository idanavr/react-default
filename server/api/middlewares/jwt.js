/* eslint max-params: 0 */
const { login: loginJWT } = require('../../auth/strategies/jwt');
const logger = new (require('../../logger'))('jwt utils for API');
const passport = require('passport');

const login = (req, res, user, successStatusCode = 200) => {
    loginJWT(req, user).then((token) => {
        res.status(successStatusCode)
            .cookie('jwt', token, { httpOnly: true })
            .send(user);
    })
        .catch((jwtErr) => {
            logger.error(jwtErr, req.body);
            res.status(400).end();
        });
};

const checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).end();
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
        return res.status(401).end();
    }

    return next();
};

// insert user to request if exist (will NOT fail if there isn't a user)
const insertUserToRequest = (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err)
            logger.info('user insertion failed', err);
        req.login(user, () => {
            next();
        });
    })(req, res, next);
};

module.exports = { login, insertUserToRequest, checkIsInRole };