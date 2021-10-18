/* eslint-disable import/extensions */
const express = require('express');

const app = express.Router();
const { all, itemDetails, search } = require('./item.controller');

app.get('/item', all);
app.get('/item/search', search);
app.get('/item/:id', itemDetails);

module.exports = app;
