/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const { find, findOne, findAll } = require('./item.services');
const { joiId } = require('./item.validation');

async function all(req, res) {
  const doc = await find();
  res.json(doc);
}
async function search(req, res) {
  const docs = await findAll();
  res.json(docs);
}
async function itemDetails(req, res, next) {
  const { params } = req;
  const validate = joiId.validate(params);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await findOne(params);
    if (doc.message) {
      next(doc);
    }
    if (doc.id) {
      res.status(HTTP.StatusCodes.OK).json(doc);
    }
  }
}

module.exports = {
  all,
  itemDetails,
  search,
};
