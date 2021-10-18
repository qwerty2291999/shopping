/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { STATUS } = require('../../configs/enum');

const joiCreate = Joi.object({
  itemId: Joi.number(),
  flashsaleId: Joi.number(),
  itemQuantity: Joi.number().required(),
})
  .or('itemId', 'flashsaleId')
  .required();
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
};
