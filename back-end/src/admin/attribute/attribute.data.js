const Items = require('../../item/item.sequelize');
const Attribute = require('./attribute.sequelize');

class AttributeData {
  static async find() {
    const doc = await Attribute.findAll();
    return doc;
  }

  static async create(any) {
    try {
      const doc = await Attribute.create(any);
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async findOne(any) {
    const doc = await Items.findOne({ where: any });
    return doc;
  }

  static async findItemAttribute(any) {
    const doc = await Attribute.findAll({ where: any });
    return doc;
  }

  static async updateOne(id, any) {
    const doc = await Attribute.update(any, { where: id });
    return doc;
  }

  static async deleteOne(id) {
    const doc = await Attribute.destroy({ where: id });
    return doc;
  }
}
module.exports = AttributeData;
