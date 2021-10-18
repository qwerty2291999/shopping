/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const joiCreate = Joi.object({
  barcode: Joi.string().min(12).required(),
  name: Joi.string().min(5).required(),
  importPrice: Joi.number().required(),
  sellingPrice: Joi.number().required(),
  weight: Joi.number().required(),
  quantity: Joi.number().required(),
  desciption: Joi.string().min(10).max(500).required(),
  mainimg: Joi.object().required(),
  detailimgs: Joi.array().required(),
  categoryId: Joi.number().required(),
});
const joiId = Joi.object({
  id: Joi.number().required(),
});
const joiEdit = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(5),
  importPrice: Joi.number(),
  sellingPrice: Joi.number(),
  weight: Joi.number(),
  quantity: Joi.number(),
  desciption: Joi.string().min(10).max(500),
});
module.exports = { joiCreate, joiId, joiEdit };
