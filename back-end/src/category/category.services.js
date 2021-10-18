const CategoryData = require('./category.data');
const Error = require('../../errors/errors');

const err = new Error();

async function find(page) {
  const doc = await CategoryData.find();
  const itemPerPage = 10;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
async function create(any) {
  const doc = await CategoryData.create(any);
  return doc;
}
async function findOne(any) {
  const doc = await CategoryData.findOne(any);
  if (doc) {
    return doc.toJSON();
  }
  return err.notFound();
}
async function findItems(any) {
  const doc = await CategoryData.findItems(any);
  if (doc[0]) {
    return doc;
  }
  return err.notFound();
}
async function updateOne(id, any) {
  const doc = await CategoryData.updateOne(id, any);
  return doc;
}
async function updateBulkItems(id, any) {
  const doc = await CategoryData.updateBulkItems(id, any);
  return doc;
}
async function deleteOne(id) {
  const doc = await CategoryData.deleteOne(id);
  return doc;
}
module.exports = {
  find,
  create,
  findOne,
  updateOne,
  deleteOne,
  findItems,
  updateBulkItems,
};
