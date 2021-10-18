/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
const express = require('express');
const { getLogin, postLogin, newToken, logout, postRegiser } = require('./auth.controller');
const { Auth, Admin } = require('./auth.middleware');

const app = express.Router();

app.get('/admin/auth/login', Auth, getLogin);
app.post('/admin/auth/createAccount', Auth, Admin, postRegiser);
app.post('/admin/auth/login', postLogin);
app.post('/admin/auth/newtoken', newToken);
app.post('/admin/auth/logout', logout);

module.exports = app;
