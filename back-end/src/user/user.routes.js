/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const app = express.Router();

const { me, infoUpdate, passUpdate } = require('./user.controller');

app.get('/user', Auth, me);
app.post('/user/update', Auth, infoUpdate);
app.post('/user/password', Auth, passUpdate);

module.exports = app;
