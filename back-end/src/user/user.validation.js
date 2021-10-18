const Joi = require('joi');

const joiUpdate = Joi.object({
  name: Joi.string().min(10).max(100),
  phoneNumber: Joi.string().min(9).max(12),
  address: Joi.string().min(10).max(100),
});
const joiPassword = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9._]{3,30}$'))
    .required(),
  repeat_password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9._]{3,30}$'))
    .required()
    .valid(Joi.ref('password')),
});

module.exports = { joiUpdate, joiPassword };
