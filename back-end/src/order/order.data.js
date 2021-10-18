const Order = require('./order.sequelize');
const OrderMain = require('./ordermain.sequelize');
const Items = require('../item/item.sequelize');
const Sale = require('../flashsale/flashsale.sequelize');
const Voucher = require('../voucher/voucher.sequelize');
const Users = require('../user/user.sequelize');
const Attributes = require('../admin/attribute/attribute.sequelize');

class OrderData {
  static async createMain(any) {
    const doc = await OrderMain.create(any);
    return doc;
  }

  static async createOne(any) {
    const doc = await Order.create(any);
    return doc;
  }

  static async updateOrderMain(id, any) {
    try {
      const doc = await OrderMain.update(any, { where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async updateOrder(key, any) {
    try {
      const doc = await Order.update(any, { where: { id: key.id } });
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async updateSaleQ(id, any) {
    try {
      const doc = await Sale.update(any, { where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async updateItemQ(id, any) {
    try {
      const doc = await Items.update(any, { where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async updateQVoucher(id, any) {
    try {
      const doc = await Voucher.update(any, { where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async deleteOrder(id) {
    try {
      const doc = await Order.destroy({ where: id });
      return doc;
    } catch (e) {
      return e;
    }
  }

  static async findMain(id, any) {
    const doc = await OrderMain.findOne({ where: id && any });
    return doc;
  }

  static async findOrders(id) {
    const doc = await Order.findAll({ where: id });
    return doc;
  }

  static async findOrder(id) {
    const doc = await Order.findOne({ where: id });
    return doc;
  }

  static async findSale(id) {
    const doc = await Sale.findOne({ where: id });
    return doc;
  }

  static async findUser(id) {
    const doc = await Users.findOne({ where: id });
    return doc;
  }

  static async findItem(id) {
    const doc = await Items.findOne({ where: id });
    return doc;
  }

  static async findVoucher(id) {
    const doc = await Voucher.findOne({ where: id });
    return doc;
  }

  static async findItemAttribute(id) {
    const doc = await Attributes.findAll({ where: id });
    return doc;
  }
}
module.exports = OrderData;
