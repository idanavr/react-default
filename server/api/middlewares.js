/* eslint prefer-destructuring: off, callback-return: off */
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const privatekey = global.config.jwtKey;

function checkAuthority(req, res, next) {
    const { authorization } = req.headers;
    if(process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test')
        next();
    else if(authorization) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, privatekey, (err, decoded) => {
            if(err) 
                res.status(403).end();
            else {
                userModel.findOne({ _id: decoded.id }, (error, user) => {
                    if(error || !user)
                        res.status(403).end();
                    else {
                        res.locals.user = user;
                        next();
                    }
                });
            }
        });
    } else {
        console.log('no token - checkAuthority');
        res.status(403).end();
    }
}

module.exports = checkAuthority;