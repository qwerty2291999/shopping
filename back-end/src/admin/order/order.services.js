/* eslint-disable no-param-reassign */
const OrderData = require('./order.data');
const {
  applyVoucherCate,
  applyVoucherId,
  applyVoucherIdnCate,
  applyVoucher,
} = require('../../../functions/numbers');

async function createMain(id) {
  const doc = await OrderData.createMain(id);
  return doc;
}
async function create(data) {
  const doc = await OrderData.createOne(data);
  return doc;
}
async function findMain(id, any) {
  const doc = await OrderData.findMain(id, any);
  return doc;
}
async function findOrders(id) {
  const doc = await OrderData.findOrders(id);
  return doc;
}
async function findOrder(id) {
  const doc = await OrderData.findOrder(id);
  return doc;
}
async function findUser(id) {
  const doc = await OrderData.findUser(id);
  return doc;
}
async function findSale(id) {
  const doc = await OrderData.findSale(id);
  return doc;
}
async function findItem(id) {
  const doc = await OrderData.findItem(id);
  return doc;
}
async function findVoucher(data) {
  const doc = await OrderData.findVoucher(data);
  return doc;
}
async function deleteOrder(id) {
  const deleOrder = await OrderData.deleteOrder(id);
  return deleOrder;
}
async function applyCate(data, voucher) {
  const newData = applyVoucherCate(data, voucher);
  await newData.map(async (item) => {
    await OrderData.updateOrder({ id: item.id }, item);
    return item;
  });
  return newData;
}
async function updateOrderMain(id, any) {
  const doc = await OrderData.updateOrderMain(id, any);
  return doc;
}
async function updateOrder(id, any) {
  const doc = await OrderData.updateOrder(id, any);
  return doc;
}
async function applyId(data, voucher) {
  const newData = applyVoucherId(data, voucher);
  await newData.map(async (item) => {
    await OrderData.updateOrder({ id: item.id }, item);
    return item;
  });
  return newData;
}
async function applyIdnCate(data, voucher) {
  const newData = applyVoucherIdnCate(data, voucher);
  await newData.map(async (item) => {
    await OrderData.updateOrder({ id: item.id }, item);
    return item;
  });
  return newData;
}
async function applyAll(data, voucher) {
  const newData = applyVoucher(data, voucher);
  await newData.map(async (item) => {
    await OrderData.updateOrder({ id: item.id }, item);
    return item;
  });
  return newData;
}

module.exports = {
  createMain,
  findMain,
  findSale,
  findItem,
  create,
  findOrder,
  findOrders,
  updateOrderMain,
  updateOrder,
  findVoucher,
  applyCate,
  applyId,
  applyIdnCate,
  applyAll,
  deleteOrder,
  findUser,
};
