const ItemData = require('./item.data');
const Error = require('../../../errors/errors');

const err = new Error();

async function find(page) {
  const doc = await ItemData.find();
  const itemPerPage = 5;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
async function create(any) {
  const doc = await ItemData.create(any);
  return doc;
}
async function findOne(any) {
  const doc = await ItemData.findOne(any);
  if (doc) {
    return doc.toJSON();
  }
  return err.notFound();
}
async function findOneCate(any) {
  const doc = await ItemData.findOneCate(any);
  if (doc) {
    return doc.toJSON();
  }
  return err.notFound();
}
async function updateOne(id, any) {
  const doc = await ItemData.updateOne(id, any);
  return doc;
}
async function deleteOne(id) {
  const doc = await ItemData.deleteOne(id);
  return doc;
}
module.exports = {
  find,
  create,
  findOne,
  updateOne,
  deleteOne,
  findOneCate,
};
