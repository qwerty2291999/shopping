const Voucher = require('../../voucher/voucher.sequelize');

class VoucherData {
  static async find(any) {
    const doc = await Voucher.findAll({ where: any });
    return doc;
  }

  static async create(any) {
    try {
      const doc = await Voucher.create(any);
      return doc;
    } catch (err) {
      return err;
    }
  }

  static async findByStatus(any) {
    const doc = await Voucher.findAll({ where: any });
    return doc;
  }

  static async updateOne(id, any) {
    const doc = await Voucher.update(any, { where: id });
    return doc;
  }

  static async deleteOne(id) {
    try {
      const doc = await Voucher.destroy({ where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }
}
module.exports = VoucherData;
