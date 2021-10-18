const Admins = require('./admin.sequelize');
const Roles = require('./role.sequelize');

class AuthData {
  static async register(obj) {
    try {
      const doc = await Admins.create(obj);
      await Roles.create({ adminId: doc.id });
      return doc;
    } catch (e) {
      if (e) {
        return e;
      }
      return 0;
    }
  }

  static async find() {
    const doc = await Admins.findAll();
    return doc;
  }

  static async findOne(obj) {
    const doc = await Admins.findOne({ where: obj });
    const doc1 = await Roles.findOne({ where: { adminId: doc.id } });
    doc.dataValues.role = doc1.role;
    return doc;
  }
}
module.exports = AuthData;
