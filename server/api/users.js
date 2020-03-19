const express = require('express');
const router = express.Router();
const userBL = require('../BL/users');
const logger = new (require('../logger'))('Users API');
const passport = require('passport');
const { login: loginJWT, checkIsInRole } = require('./middlewares/jwt');
const { roleEnum } = require('../models/db/utils');

router.get('/', passport.authenticate('jwt'), checkIsInRole(roleEnum.Admin), (req, res) => {
    userBL.getUsers()
    .then((users) => {
        if(users.err) {
            logger.error(users.err);
            res.status(400).end();
        } else
            res.send(users);
    })
    .catch((error) => {
        logger.error(error);
        res.status(500).end();
    });
});

router.get('/me', passport.authenticate('jwt'), (req, res) => {
    if (req.user)
        res.status(200).send(req.user);
    else
        res.status(400).end();
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (id.length === 24) {
        userBL.getUserById(id)
            .then((user) => {
                if (!user)
                    res.status(404).end();
                else
                    res.send(user);
            })
            .catch((err) => {
                logger.error(err);
                res.status(500).end();
            });
    } else {
        logger.warn('GET user by id - Invalid id');
        res.status(400).end();
    }
});

router.post('/', (req, res) => {
    userBL.saveUser(req.body)
        .then((user) => {
            if (user.err) {
                logger.info(user.err, req.body);
                res.status(400).send(user.err.clientMessage);
            } else {
                loginJWT(req, res, user, 201);
            }
        })
        .catch((err) => {
            logger.error(err, req.body);
            res.status(500).end();
        });
});

router.put('/:id', passport.authenticate('jwt'), (req, res) => {
    if(!req.params.id) {
        logger.warn('users PUT method doesn\'t have id in req.params');
        res.status(404);
    }
    req.body.id = req.params.id;
    userBL.updateUser(req.params.id, req.body)
        .then((user) => {
            if(!user) {
                logger.error(new Error('Update didn\'t return anything.'));
            } else if (user.err) {
                logger.error(user.err, { params: req.params, body: req.body });
                res.status(400).send(user.err.clientMessage);
            } else {
                res.status(200).send(user);
            }
        })
        .catch((err) => {
            logger.error(err, { params: req.params, body: req.body });
            res.status(500).end();
        });
});

router.delete('/', passport.authenticate('jwt'), checkIsInRole(roleEnum.Admin), (req, res) => {
    const { id } = req.body;
    if (id) {
        userBL.deleteUser(id)
            .then((user) => {
                if (user.err) {
                    logger.warn(user.err);
                    res.status(400).end();
                } else {
                    res.status(200).send(user);
                }
            })
            .catch((err) => {
                logger.error(err);
                res.status(500).end();
            });
    } else {
        logger.warn('DELETE user by id - Invalid id');
        res.status(400).end();
    }
});

module.exports = router;