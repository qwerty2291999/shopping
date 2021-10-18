/* eslint-disable import/extensions */
const express = require('express');
// const { Auth } = require('../auth/auth.middleware');

const app = express.Router();
const { saleActive } = require('./flashsale.controller');

app.get('/flashsales', saleActive);

module.exports = app;
