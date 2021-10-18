/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const { find, findOne, create, updateOne, findItemId } = require('./flashsale.services');
const { joiCreate, joiUpdate } = require('./flashsale.validation');
const Error = require('../../../errors/errors');
const { STATUS } = require('../../../configs/enum');
const { startDate, endDate } = require('../../../functions/date');

const err = new Error();

async function all(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await find(page);
  res.json(doc);
}
async function createSale(req, res, next) {
  const data = req.body;
  const start = data.startDate;
  const end = data.endDate;
  data.startDate = startDate(start);
  data.endDate = endDate(start, end);
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const doc = await findItemId({ id: data.itemId });
  if (doc === null) {
    return next(err.notFound());
  }
  if (data.quantity > doc.quantity) {
    return next(err.higherThanMax(data, doc));
  }
  const a = doc.toJSON();
  data.itemName = a.name;
  data.itemPrice = a.sellingPrice;
  data.itemImg = a.mainimg;
  data.categoryId = a.categoryId;
  if (data.itemSalePrice < 100) {
    const doc1 = await findOne({ itemId: data.itemId });
    if (doc1 == null) {
      data.itemNewPrice = data.itemPrice - (data.itemPrice * data.itemSalePrice) / 100;
      const doc2 = await create(data);
      return res.json(doc2);
    }
    if (doc1.status === STATUS.inactive || doc1.status === STATUS.active) {
      return next(err.onSale());
    }
    data.itemNewPrice = data.itemPrice - (data.itemPrice * data.itemSalePrice) / 100;
    const doc2 = await create(data);
    res.json(doc2);
  } else {
    const doc1 = await findOne({ itemId: data.itemId });
    if (doc1 == null) {
      data.itemNewPrice = data.itemPrice - data.itemSalePrice;
      const doc2 = await create(data);
      return res.json(doc2);
    }
    if (doc1.status === STATUS.inactive || doc1.status === STATUS.active) {
      return next(err.onSale());
    }
    data.itemNewPrice = data.itemPrice - data.itemSalePrice;
    const doc2 = await create(data);
    res.json(doc2);
  }
}
async function saleUpdate(req, res, next) {
  const { id, status } = req.body;
  const validate = joiUpdate.validate({ status });
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await updateOne({ id }, { status });
    if (doc.original) {
      next(err.duplicateDB(doc.original.detail));
    }
    if (doc[0] === 1) {
      res.status(HTTP.StatusCodes.OK).json({ message: 'Updated' });
    }
    if (doc[0] === 0) {
      next(err.notFound());
    }
  }
}
async function saleActive(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await find(page, { status: STATUS.active });
  res.json(doc);
}
async function saleInactive(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await find(page, { status: STATUS.inactive });
  res.json(doc);
}
module.exports = {
  all,
  createSale,
  saleUpdate,
  saleActive,
  saleInactive,
};
