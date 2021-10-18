/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const app = express.Router();
const {
  all,
  findActiveVoucher,
  createVoucher,
  findInactiveVoucher,
  voucherDelete,
} = require('./voucher.controller');

app.get('/admin/voucher', Auth, all);
app.post('/admin/voucher/create', Auth, createVoucher);
app.get('/admin/voucher/find/active', Auth, findActiveVoucher);
app.get('/admin/voucher/find/inactive', Auth, findInactiveVoucher);
app.post('/admin/voucher/delete', Auth, voucherDelete);

module.exports = app;
