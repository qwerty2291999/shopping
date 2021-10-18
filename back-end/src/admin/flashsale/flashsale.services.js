/* eslint-disable no-param-reassign */
const SaleData = require('./flashsale.data');
const { STATUS } = require('../../../configs/enum');

async function find(page, status) {
  const doc = await SaleData.find(status);
  const itemPerPage = 10;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
async function findItemId(id) {
  const doc = await SaleData.findItemId(id);
  return doc;
}
async function findOne(id) {
  const doc = await SaleData.findOne(id);
  return doc;
}

async function findByStatus(page, status) {
  const doc = await SaleData.findByStatus(status);
  const itemPerPage = 10;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
async function create(any) {
  if (any.startDate.getTime() < Date.now()) {
    any.status = STATUS.active;
  }
  const doc = await SaleData.create(any);
  return doc;
}

async function deleteOne(any) {
  const doc = await SaleData.deleteOne(any);
  return doc;
}
async function updateOne(id, any) {
  const doc = await SaleData.updateOne(id, any);
  return doc;
}
async function findExpired() {
  const docs = await SaleData.find({ status: STATUS.active });
  const expired = docs.filter((item) => new Date(item.endDate).getTime() < Date.now());
  return expired;
}
async function findInactive() {
  const docs = await SaleData.find({ status: STATUS.inactive });
  const expired = docs.filter((item) => new Date(item.startDate).getTime() < Date.now());
  return expired;
}
module.exports = {
  find,
  create,
  deleteOne,
  findByStatus,
  findItemId,
  findOne,
  updateOne,
  findExpired,
  findInactive,
};
