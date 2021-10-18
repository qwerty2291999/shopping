const AttributeData = require('./attribute.data');
const Error = require('../../../errors/errors');

const err = new Error();

async function find(page) {
  const doc = await AttributeData.find();
  const itemPerPage = 5;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
async function findItemId(id) {
  const doc = await AttributeData.findOne(id);
  if (doc == null) {
    return err.notFound();
  }
  return doc;
}
async function findItemAttribute(id) {
  const doc = await AttributeData.findItemAttribute(id);
  if (doc == null) {
    return err.notFound();
  }
  return doc;
}
async function create(any) {
  const doc = await AttributeData.create(any);
  return doc;
}
async function findOne(any) {
  const doc = await AttributeData.findOne(any);
  if (doc) {
    return doc.toJSON();
  }
  return err.notFound();
}
async function findOneCate(any) {
  const doc = await AttributeData.findOneCate(any);
  if (doc) {
    return doc.toJSON();
  }
  return err.notFound();
}
async function updateOne(id, any) {
  const doc = await AttributeData.updateOne(id, any);
  return doc;
}
async function deleteOne(id) {
  const doc = await AttributeData.deleteOne(id);
  return doc;
}
module.exports = {
  find,
  create,
  findOne,
  updateOne,
  deleteOne,
  findOneCate,
  findItemId,
  findItemAttribute,
};
