/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const app = express.Router();
const { all, createSale, saleUpdate, saleActive, saleInactive } = require('./flashsale.controller');

app.get('/admin/flashsales', Auth, all);
app.post('/admin/flashsales/create', Auth, createSale);
app.post('/admin/flashsales/update', Auth, saleUpdate);
app.get('/admin/flashsales/active', Auth, saleActive);
app.get('/admin/flashsales/inactive', Auth, saleInactive);

module.exports = app;
