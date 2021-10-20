/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const app = express.Router();
const {
  all,
  createOrder,
  orderApplyVoucher,
  deleteOneOrder,
  completeOrder,
  orderRemoveVoucher,
  getPrice,
  updateOrderAddress,
} = require('./order.controller');

app.get('/myorder', Auth, all);
app.get('/myorderprice', Auth, getPrice);
app.post('/myorder/create', Auth, createOrder);
app.post('/myorder/applyvoucher', Auth, orderApplyVoucher);
app.post('/myorder/delete', Auth, deleteOneOrder);
app.post('/myorder/updateaddress', updateOrderAddress);
app.post('/myorder/removevoucher', Auth, orderRemoveVoucher);
app.post('/myorder/complete', Auth, completeOrder);

module.exports = app;
