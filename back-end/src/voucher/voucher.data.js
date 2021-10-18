const Voucher = require('./voucher.sequelize');

class VoucherData {
  static async findByStatus(any) {
    const doc = await Voucher.findAll({ where: any });
    return doc;
  }
}
module.exports = VoucherData;
