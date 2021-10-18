const Order = require('./order.sequelize');
const OrderMain = require('./ordermain.sequelize');
const Items = require('../item/item.sequelize');
const Sale = require('../flashsale/flashsale.sequelize');
const Voucher = require('../voucher/voucher.sequelize');

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

  static async updateOrder(id, any) {
    try {
      const doc = await Order.update(any, { where: id });
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

  static async findItem(id) {
    const doc = await Items.findOne({ where: id });
    return doc;
  }

  static async findVoucher(id) {
    const doc = await Voucher.findOne({ where: id });
    return doc;
  }
}
module.exports = OrderData;
