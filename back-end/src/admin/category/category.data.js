const Category = require('../../category/category.sequelize');
const Items = require('../../item/item.sequelize');

class CategoryData {
  static async find() {
    const doc = await Category.findAll();
    return doc;
  }

  static async create(any) {
    try {
      const doc = await Category.create(any);
      return doc;
    } catch (err) {
      return err;
    }
  }

  static async findOne(any) {
    const doc = await Category.findOne({ where: any });
    return doc;
  }

  static async findItems(any) {
    const doc = await Items.findAll({ where: any });
    return doc;
  }

  static async updateOne(id, any) {
    const doc = await Category.update(any, { where: id });
    return doc;
  }

  static async updateBulkItems(id, any) {
    const doc = await Items.update(any, { where: id });
    return doc;
  }

  static async deleteOne(id) {
    try {
      const doc = await Category.destroy({ where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }
}
module.exports = CategoryData;
