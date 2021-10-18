/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const upload = require('../../../configs/multer');

const app = express.Router();
const {
  all,
  createItem,
  itemDetails,
  itemEdit,
  itemEditImgs,
  itemDelete,
} = require('./item.controller');

app.get('/admin/item', Auth, all);
app.post(
  '/admin/item/create',
  Auth,
  upload.fields([
    { name: 'mainimg', maxCount: 1 },
    { name: 'imgs', maxCount: 8 },
  ]),
  createItem,
);
app.get('/admin/item/:id', Auth, itemDetails);
app.post('/admin/item/editinfo', Auth, itemEdit);
app.post(
  '/admin/item/editimg',
  upload.fields([
    { name: 'mainimg', maxCount: 1 },
    { name: 'imgs', maxCount: 8 },
  ]),
  Auth,
  itemEditImgs,
);
app.post('/admin/item/delete', Auth, itemDelete);

module.exports = app;
