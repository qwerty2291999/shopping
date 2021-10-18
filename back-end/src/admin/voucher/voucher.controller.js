/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const { find, create, deleteOne, findByStatus } = require('./voucher.services');
const { joiCreate } = require('./voucher.validation');
const Error = require('../../../errors/errors');
const { STATUS } = require('../../../configs/enum');
const { randomString } = require('../../../functions/strings');
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
async function createVoucher(req, res, next) {
  const data = req.body;
  const start = data.startDate;
  const end = data.endDate;
  data.startDate = startDate(start);
  data.endDate = endDate(start, end);
  data.code = randomString(6);
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await create(data);
    res.json(doc);
  }
}
async function findActiveVoucher(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await findByStatus(page, { status: STATUS.active });
  res.json(doc);
}
async function findInactiveVoucher(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await findByStatus(page, { status: STATUS.inactive });
  res.json(doc);
}
async function voucherDelete(req, res, next) {
  const { code } = req.body;
  const doc = await deleteOne({ code });
  if (doc.original) {
    next(err.duplicateDB(doc.original.detail));
  }
  if (doc === 1) {
    res.status(HTTP.StatusCodes.OK).json({ message: 'Deleted' });
  }
  if (doc === 0) {
    next(err.notFound());
  }
}
module.exports = {
  all,
  createVoucher,
  findActiveVoucher,
  findInactiveVoucher,
  voucherDelete,
};
