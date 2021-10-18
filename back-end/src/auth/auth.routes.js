/* eslint-disable import/extensions */
const express = require('express');
const {
  getLogin,
  postLogin,
  newToken,
  postRegiser,
  logout,
  verify,
  forgotPass,
  recover,
  changePass,
} = require('./auth.controller');
const { Auth } = require('./auth.middleware');

const app = express.Router();

app.get('/auth/login', Auth, getLogin);
app.post('/auth/login', postLogin);
app.post('/auth/newtoken', newToken);
app.post('/auth/register', postRegiser);
app.get('/auth/verification/:email', verify);
app.get('/auth/forgot', forgotPass);
app.get('/auth/recovery/:email', recover);
app.get('/auth/recovery/changepass/:email', changePass);
app.post('/auth/logout', logout);

module.exports = app;
