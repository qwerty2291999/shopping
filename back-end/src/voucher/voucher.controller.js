/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const { findByStatus } = require('./voucher.services');
const { STATUS } = require('../../configs/enum');

async function findActiveVoucher(req, res) {
  const doc = await findByStatus({ status: STATUS.active });
  res.json(doc);
}

module.exports = {
  findActiveVoucher,
};
