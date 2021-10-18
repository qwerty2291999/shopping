const Users = require('./user.sequelize');

class AuthData {
  static async findOne(any) {
    const doc = await Users.findOne({ where: any });
    return doc;
  }

  static async updateOne(id, any) {
    const doc = await Users.update(any, { where: id });
    return doc;
  }
}
module.exports = AuthData;
