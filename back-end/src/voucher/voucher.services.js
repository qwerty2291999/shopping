/* eslint-disable no-param-reassign */
const VoucherData = require('./voucher.data');

async function findByStatus(status) {
  const doc = await VoucherData.findByStatus(status);
  return doc;
}

module.exports = {
  findByStatus,
};
