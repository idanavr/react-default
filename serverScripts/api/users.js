const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const checkAuthority = require('./middlewares');

router.get('/', checkAuthority, (req, res) => {
    userModel.find((err, users) => {
        if(err)
            res.status(400).end();
        res.send(users);
    });
});

router.get('/:id', checkAuthority, (req, res) => {
    if (req.params.id.length === 24) {
        userModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, (err, user) => {
            if (err) {
                res.status(400);
                res.end();
            } else if(!user) {
                res.status(400);
                res.send('No user was found.');
            } else {
                res.send(user);
            }
        });
    } else
        res.status(400).send('Invalid id.');
});

router.post('/', (req, res) => {
    const newUser = new userModel(); // eslint-disable-line new-cap
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.gender = req.body.gender;
    newUser.password = req.body.password;

    newUser.save((err, user) => {
        if(err) {
            console.log(err);
            const errors = Object.keys(err.errors).map((field) => err.errors[field].message);
            res.send(errors[0]);
        } else {
            res.status(201);
            res.send(user);
        }
    });
});

router.delete('/', checkAuthority, (req, res) => {
    if(req.body) {
        userModel.find({ _id: req.body.id }).remove()
        .then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch(() => {
            res.status(400).end();
        });
    } else {
        res.status(400);
        res.end();
    }
});

module.exports = router;