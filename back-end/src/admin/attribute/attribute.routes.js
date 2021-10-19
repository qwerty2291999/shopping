/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const app = express.Router();
const {
  all,
  createAttribute,
  itemAttributes,
  updateAttribute,
  deleteAttribute,
} = require('./attribute.controller');

app.get('/admin/attribute', Auth, all);
app.get('/admin/attribute/:itemId', itemAttributes);
app.get('/admin/attribute/one/:attId', itemAttributes);
app.post('/admin/attribute/create', Auth, createAttribute);
app.post('/admin/attribute/update', Auth, updateAttribute);
app.post('/admin/attribute/delete', Auth, deleteAttribute);

module.exports = app;
