const Joi = require('joi');

const joiRegister = Joi.object({
  username: Joi.string().alphanum().min(5).max(100).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._]{3,30}$')).required(),
  repeat_password: Joi.ref('password'),
  name: Joi.string().min(10).max(100).required(),
});
const joiLogin = Joi.object({
  username: Joi.string().alphanum().min(5).max(100),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(5)
    .max(100),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._]{3,30}$')).required(),
})
  .or('username', 'email')
  .required();
module.exports = { joiRegister, joiLogin };
