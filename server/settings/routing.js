const express = require('express');
const path = require('path');
const distFolder = path.join(__dirname, '..', '..', 'public');

module.exports = (app) => {
    app.use(express.static(distFolder));

    const userApi = require('../api/users');
    const loginApi = require('../api/login');
    app.use('/api/users', userApi);
    app.use('/api/login', loginApi);

    app.get('*', (req, res) => {
        res.sendFile(`${distFolder}/index.html`);
    });
};