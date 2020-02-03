const express = require('express');
const path = require('path');
const distFolder = path.join(__dirname, '..', '..', 'public');

module.exports = (app, env) => {

    const userApi = require('../api/users');
    const loginApi = require('../api/login');
    app.use('/api/users', userApi);
    app.use('/api/login', loginApi);

    if (env !== 'development') {
        app.use(express.static(distFolder));
        
        app.get('*', (req, res) => {
            res.sendFile(`${distFolder}/index.html`);
        });
    }
};