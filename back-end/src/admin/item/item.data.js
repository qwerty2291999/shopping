const Items = require('../../item/item.sequelize');
const Category = require('../../category/category.sequelize');
const { STATUS } = require('../../../configs/enum');

class ItemData {
  static async find() {
    const doc = await Items.findAll();
    return doc;
  }

  static async create(any) {
    try {
      const doc = await Items.create(any);
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async findOne(any) {
    const doc = await Items.findOne({ where: any });
    return doc;
  }

  static async findOneCate(any) {
    const doc = await Category.findOne({ where: any });
    return doc;
  }

  static async updateOne(id, any) {
    const doc = await Items.update(any, { where: id });
    return doc;
  }

  static async deleteOne(id) {
    const doc = await Items.destroy({ where: id });
    return doc;
  }
}
module.exports = ItemData;
