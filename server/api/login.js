const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const checkAuthority = require('./middlewares');
const logger = new (require('../logger'))('Login API');

const JWT_KEY = global.config.jwtKey;

router.get('/:token', checkAuthority, (req, res) => {
    res.send({ user: { firstName: res.locals.user.firstName } });
});

router.post('/', (req, res) => { // change it - there is no password check for easier testing
    userModel.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) {
            logger.error(err, req.body);
            res.status(400).end();
        } else if (!user)
            res.status(404).end();
        else {
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, JWT_KEY);
            res.status(200).send({ user: { firstName: user.firstName }, token });
        }
    });
});

module.exports = router;