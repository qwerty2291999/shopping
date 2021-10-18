/* eslint-disable no-param-reassign */
const VoucherData = require('./voucher.data');
const { STATUS } = require('../../../configs/enum');

async function find(page) {
  const doc = await VoucherData.find();
  const itemPerPage = 10;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
async function findByStatus(page, status) {
  const doc = await VoucherData.findByStatus(status);
  const itemPerPage = 10;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
async function create(any) {
  if (any.startDate.getTime() < Date.now()) {
    any.status = STATUS.active;
  }
  const doc = await VoucherData.create(any);
  return doc;
}

async function deleteOne(any) {
  const doc = await VoucherData.deleteOne(any);
  return doc;
}
async function findVExpired() {
  const docs = await VoucherData.find({ status: STATUS.active });
  const expired = docs.filter((item) => new Date(item.endDate).getTime() < Date.now());
  return expired;
}
async function findVInactive() {
  const docs = await VoucherData.find({ status: STATUS.inactive });
  const expired = docs.filter((item) => new Date(item.startDate).getTime() < Date.now());
  return expired;
}
async function updateV(id, any) {
  const doc = await VoucherData.updateOne(id, any);
  return doc;
}
module.exports = {
  find,
  create,
  deleteOne,
  findByStatus,
  findVExpired,
  findVInactive,
  updateV,
};
