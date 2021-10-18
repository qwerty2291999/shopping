const Sale = require('../../flashsale/flashsale.sequelize');
const Items = require('../../item/item.sequelize');
// const { STATUS } = require('../../../configs/enum');

class SaleData {
  static async find(any) {
    const doc = await Sale.findAll({ where: any });
    return doc;
  }

  static async findItemId(id) {
    const doc = await Items.findOne({ where: id });
    return doc;
  }

  static async findOne(id) {
    const doc = await Sale.findOne({ where: id });
    return doc;
  }

  static async create(any) {
    try {
      const doc = await Sale.create(any);
      return doc;
    } catch (err) {
      return err;
    }
  }

  static async findByStatus(any) {
    const doc = await Sale.findAll({ where: any });
    return doc;
  }

  static async deleteOne(id) {
    try {
      const doc = await Sale.destroy({ where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async updateOne(id, any) {
    const doc = await Sale.update(any, { where: id });
    return doc;
  }
}
module.exports = SaleData;
