/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { CATEGORY, STATUS } = require('../../../configs/enum');

const joiCreate = Joi.object({
  category: Joi.string()
    .equal(CATEGORY.food, CATEGORY.drink, CATEGORY.electronic, CATEGORY.wear)
    .required(),
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
