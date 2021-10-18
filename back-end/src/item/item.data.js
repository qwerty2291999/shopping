const Items = require('./item.sequelize');
const { STATUS } = require('../../configs/enum');

class ItemData {
  static async find() {
    const doc = await Items.findAll({
      where: { categoryStatus: STATUS.active },
    });
    return doc;
  }

  static async findOne(any) {
    const doc = await Items.findOne({ where: any });
    return doc;
  }
}
module.exports = ItemData;
