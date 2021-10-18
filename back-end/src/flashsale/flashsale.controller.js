/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const { find } = require('./flashsale.services');
const { STATUS } = require('../../configs/enum');

async function saleActive(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await find(page, { status: STATUS.active });
  res.json(doc);
}
module.exports = {
  saleActive,
};
