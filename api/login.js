/* global require module */

const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const checkAuthority = require('./middlewares');
const privatekey = require('./jwtKey');

router.get('/:token', checkAuthority, (req, res) => {
        res.send({ user: { firstName :res.locals.user.firstName } });
});

router.post('/', (req, res) => { // change it - there is no password check for easier testing
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (err)
            res.send(err);
        else if (!user)
            res.status(204).end();
        else {
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, privatekey);
            console.log(token);
            res.status(200).send({ user: { firstName: user.firstName }, token });
        }
    });
});

module.exports = router;