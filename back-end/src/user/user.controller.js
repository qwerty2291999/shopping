/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const { findOne, updateOne } = require('./user.services');
const { joiUpdate, joiPassword } = require('./user.validation');
const Error = require('../../errors/errors');

const err = new Error();

async function me(req, res, next) {
  const { user } = req;
  const doc = await findOne({ id: user.id });
  res.json(doc);
}
async function infoUpdate(req, res, next) {
  const { user } = req;
  const data = req.body;
  const validate = joiUpdate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  }
  const doc = await updateOne({ id: user.id }, data);
  if (!doc.message) {
    res.status(HTTP.StatusCodes.OK).json(doc);
  } else {
    return next(doc);
  }
}
async function passUpdate(req, res, next) {
  const { user } = req;
  const data = req.body;
  const validate = joiPassword.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  }
  const doc = await updateOne({ id: user.id }, data);
  if (!doc.message) {
    res.status(HTTP.StatusCodes.OK).json(doc);
  } else {
    return next(doc);
  }
}

module.exports = {
  me,
  infoUpdate,
  passUpdate,
};
