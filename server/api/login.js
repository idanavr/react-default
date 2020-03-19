const express = require('express');
const router = express.Router();
const userBL = require('../BL/users');
const { login: loginJWT } = require('./middlewares/jwt');

router.post('/', (req, res) => {
    userBL.getUserByCredentials(req.body.email, req.body.password)
        .then((user) => {
            if (!user)
                res.status(404).end();
            else {
                loginJWT(req, res, user);
            }
        });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.clearCookie('jwt');
    res.status(204).end();
});

module.exports = router;