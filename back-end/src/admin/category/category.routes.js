/* eslint-disable import/extensions */
const express = require('express');
const { Auth } = require('../auth/auth.middleware');

const upload = require('../../../configs/multer');

const app = express.Router();
const {
  all,
  categoryCreate,
  categoryItems,
  categoryEdit,
  categoryEditImg,
  categoryDelete,
} = require('./category.controller');

app.get('/admin/category', Auth, all);
app.post(
  '/admin/category/create',
  Auth,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
  categoryCreate,
);
app.post('/admin/category/find/:categoryId', Auth, categoryItems);
app.post(
  '/admin/category/update/banner',
  Auth,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
  categoryEditImg,
);
app.post('/category/update/status', Auth, categoryEdit);
app.post('/category/delete/', Auth, categoryDelete);

module.exports = app;
