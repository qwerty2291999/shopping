/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { STATUS } = require('../../../configs/enum');

const joiCreate = Joi.object({
  itemId: Joi.number().required(),
  itemSalePrice: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  quantity: Joi.number().required(),
  status: Joi.string().equal(STATUS.inactive).required(),
});
const joiUpdate = Joi.object({
  status: Joi.string().equal(STATUS.active, STATUS.expired).required(),
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
  joiUpdate,
};
