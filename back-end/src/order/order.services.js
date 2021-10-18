/* eslint-disable no-param-reassign */
const OrderData = require('./order.data');
const {
  applyVoucherCate,
  applyVoucherId,
  applyVoucherIdnCate,
  applyVoucher,
  removeVoucher,
} = require('../../functions/numbers');
const Errs = require('../../errors/errors');

const err = new Errs();
async function createMain(info) {
  const doc = await OrderData.createMain(info);
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
async function findUser(id) {
  const doc = await OrderData.findUser(id);
  if (!doc) {
    return err.notFound();
  }
  return doc;
}
async function findItemAttribute(id) {
  const doc = await OrderData.findItemAttribute(id);
  if (!doc) {
    return err.notFound();
  }
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
async function removeCode(data) {
  const newData = removeVoucher(data);
  await newData.map(async (item) => {
    await OrderData.updateOrder({ id: item.id }, item);
    return item;
  });
  return newData;
}
async function updateQSale(id, quantity) {
  const flashsales = await OrderData.findSale(id);
  const items = await OrderData.findItem(flashsales.itemId);
  if (flashsales.quantity - quantity < 0) {
    return err.saleMax(flashsales, quantity);
  }
  if (items.quantity - quantity < 0) {
    return err.itemMax(items, quantity);
  }
  await OrderData.updateSaleQ({ id: flashsales.id }, { quantity: flashsales.quantity - quantity });
  await OrderData.updateItemQ({ id: flashsales.itemId }, { quantity: items.quantity - quantity });
  return flashsales;
}
async function updateQItem(id, quantity) {
  const items = await OrderData.findItem(id);
  if (items.quantity - quantity < 0) {
    return err.itemMax(items, quantity);
  }
  await OrderData.updateItemQ({ id: items.id }, { quantity: items.quantity - quantity });
  return items;
}
async function updateQVoucher(code) {
  const voucher = await OrderData.findVoucher(code);
  if (voucher.quantity - 1 < 0) {
    return err.noVoucherLeft(code.code);
  }
  const a = await OrderData.updateQVoucher({ code: code.code }, { quantity: voucher.quantity - 1 });
  return a;
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
  findItemAttribute,
  removeCode,
  updateQSale,
  updateQItem,
  updateQVoucher,
};
