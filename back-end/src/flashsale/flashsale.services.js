/* eslint-disable no-param-reassign */
const SaleData = require('./flashsale.data');

async function find(page, status) {
  const doc = await SaleData.find(status);
  const itemPerPage = 10;
  const pagni = doc.slice(page * itemPerPage - itemPerPage, page * itemPerPage);
  return pagni;
}
module.exports = {
  find,
};
