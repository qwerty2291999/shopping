/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const upload = require('../../configs/multer');

const app = express.Router();
const {
  all,
  categoryCreate,
  categoryItems,
  categoryEdit,
  categoryEditImg,
  categoryDelete,
} = require('./category.controller');

app.get('/category', Auth, all);
app.post('/category/create', Auth, upload.single('banner'), categoryCreate);
app.post('/category/find/:categoryId', Auth, categoryItems);
app.post(
  '/category/update/banner',
  Auth,
  upload.single('banner'),
  categoryEditImg,
);
app.post('/category/update/status', Auth, categoryEdit);
app.post('/category/delete/', Auth, categoryDelete);

module.exports = app;
