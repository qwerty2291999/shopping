/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { STATUS } = require('../../../configs/enum');

const joiCreate = Joi.object({
  discount: Joi.number().required(),
  categoryId: Joi.number(),
  itemId: Joi.number(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  quantity: Joi.number().required(),
  code: Joi.string().min(6).required(),
});
const joiCategory = Joi.object({
  categoryId: Joi.number().required(),
});
const joiId = Joi.object({
  id: Joi.number().required(),
});
const joiEdit = Joi.object({
  id: Joi.number().required(),
  status: Joi.string().equal(STATUS.active, STATUS.inactive).required(),
});
module.exports = {
  joiCreate,
  joiId,
  joiEdit,
  joiCategory,
};
