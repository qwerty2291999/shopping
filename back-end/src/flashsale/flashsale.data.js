const Sale = require('./flashsale.sequelize');
// const { STATUS } = require('../../configs/enum');

class SaleData {
  static async find(any) {
    const doc = await Sale.findAll({ where: any });
    return doc;
  }
}
module.exports = SaleData;
