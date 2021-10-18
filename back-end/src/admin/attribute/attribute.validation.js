/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const joiCreate = Joi.object({
  itemId: Joi.number().required(),
  color: Joi.string(),
  size: Joi.string(),
});
const joiId = Joi.object({
  itemId: Joi.number().required(),
});
const joiEdit = Joi.object({
  id: Joi.number().required(),
  color: Joi.string(),
  size: Joi.string(),
});
module.exports = { joiCreate, joiId, joiEdit };
