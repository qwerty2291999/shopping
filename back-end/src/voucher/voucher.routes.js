/* eslint-disable import/extensions */
const express = require('express');

const app = express.Router();
const { findActiveVoucher } = require('./voucher.controller');

// app.get('/voucher', Auth, all);
// app.post('/voucher/create', Auth, createVoucher);
app.get('/voucher/find/active', findActiveVoucher);
// app.get('/voucher/find/inactive', Auth, findInactiveVoucher);
// app.post('/voucher/delete', Auth, voucherDelete);

module.exports = app;
