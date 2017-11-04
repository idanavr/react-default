/* eslint prefer-destructuring: off, callback-return: off */
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const privatekey = require('../../config/jwtKey');

function checkAuthority(req, res, next) {
    const { authorization: header } = req.headers;
    if(header) {
        const token = header.split(' ')[1];
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