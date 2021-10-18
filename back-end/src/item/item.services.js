const ItemData = require('./item.data');
const Error = require('../../errors/errors');

const err = new Error();

async function find() {
  const doc = await ItemData.find();
  const sort = doc.sort((a, b) => a.id - b.id, 0);
  return sort;
}

async function findAll() {
  const doc = await ItemData.find();
  return doc;
}

async function findOne(any) {
  const doc = await ItemData.findOne(any);
  if (doc) {
    return doc.toJSON();
  }
  return err.notFound();
}
module.exports = {
  find,
  findOne,
  findAll,
};
