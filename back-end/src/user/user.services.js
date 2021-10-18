const UserData = require('./user.data');
const Error = require('../../errors/errors');

const err = new Error();

async function findOne(any) {
  const doc = await UserData.findOne(any);
  return doc;
}
async function updateOne(id, any) {
  const doc = await UserData.updateOne(id, any);
  if (doc[0] === 1) {
    return findOne(id);
  }
  return err.notFound();
}

module.exports = {
  findOne,
  updateOne,
};
