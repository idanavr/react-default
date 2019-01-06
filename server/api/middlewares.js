/* eslint prefer-destructuring: off, callback-return: off */
const userModel = require('../models/db/user');
const jwt = require('jsonwebtoken');
const privatekey = global.config.jwtKey;
const logger = new (require('../logger'))('Middlewares');

function checkAuthority(req, res, next) {
    const { authorization } = req.headers;
    if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test')
        next();
    else if (authorization) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, privatekey, (err, decoded) => {
            if (err) {
                logger.error(err, req.headers);
                res.status(401).end();
            } else {
                userModel.findOne({ _id: decoded.id }, (error, user) => {
                    if (error || !user) {
                        if (error)
                            logger.error(error, decoded);
                        res.status(401).end();
                    } else {
                        res.locals.user = user;
                        next();
                    }
                });
            }
        });
    } else {
        logger.warn(new Error('checkAuthority - no token'), req.headers);
        res.status(401).end();
    }
}

module.exports = checkAuthority;