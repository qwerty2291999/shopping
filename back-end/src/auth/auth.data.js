const Users = require('../user/user.sequelize');
const Forgot = require('./forgot.sequelize');

class AuthData {
  static async register(obj) {
    try {
      const doc = await Users.create(obj);
      return doc;
    } catch (e) {
      if (e) {
        return e;
      }
      return 0;
    }
  }

  static async verify(email, status) {
    const doc = await Users.update(status, { where: email });
    return doc;
  }

  static async find() {
    const doc = await Users.findAll();
    return doc;
  }

  static async findC(any) {
    const doc = await Forgot.findAll({ where: any });
    return doc;
  }

  static async update(email, pass) {
    const doc = await Users.update(pass, { where: email });
    return doc;
  }

  static async findOne(obj) {
    const doc = await Users.findOne({ where: obj });
    return doc;
  }

  static async findForgot(obj) {
    const doc = await Forgot.findOne({ where: obj });
    return doc;
  }

  static async createForgot(obj) {
    const doc = await Forgot.create(obj);
    return doc;
  }

  static async updateForgot(email, data) {
    const doc = await Forgot.update(data, { where: email });
    return doc;
  }

  static async deleteForgot(email) {
    const doc = await Forgot.destroy({ where: email });
    return doc;
  }
}
module.exports = AuthData;
