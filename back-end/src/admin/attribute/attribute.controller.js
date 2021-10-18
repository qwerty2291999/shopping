/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const { joiCreate, joiId, joiEdit } = require('./attribute.validation');
const {
  find,
  findItemId,
  create,
  findItemAttribute,
  updateOne,
  deleteOne,
} = require('./attribute.services');

async function all(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await find(page);
  res.json(doc);
}
async function createAttribute(req, res, next) {
  const data = req.body;
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const findId = await findItemId({ id: data.itemId });
  if (findId.code) {
    return next(findId);
  }
  const doc = await create(data);
  res.json(doc);
}
async function itemAttributes(req, res, next) {
  const { itemId } = req.params;
  const validate = joiId.validate({ itemId });
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const findId = await findItemId({ id: itemId });
  if (findId.code) {
    return next(findId);
  }
  const findAttribute = await findItemAttribute({ itemId: findId.id });
  res.json(findAttribute);
}
async function updateAttribute(req, res, next) {
  const data = req.body;
  const validate = joiEdit.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const { id, ...newData } = data;
  const doc = await updateOne({ id: data.id }, newData);
  if (doc[0] == 1) {
    return res.status(HTTP.StatusCodes.OK).json('Updated');
  }
  res.status(HTTP.StatusCodes.BAD_REQUEST).json({ message: 'Failed' });
}
async function deleteAttribute(req, res, next) {
  const { id } = req.body;
  const validate = joiId.validate({ itemId: id });
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const doc = await deleteOne({ id });
  if (doc == 1) {
    return res.status(HTTP.StatusCodes.OK).json({ message: 'Successful' });
  }
  res.status(HTTP.StatusCodes.BAD_REQUEST).json({ message: 'Failed' });
}
module.exports = {
  all,
  createAttribute,
  itemAttributes,
  updateAttribute,
  deleteAttribute,
};
