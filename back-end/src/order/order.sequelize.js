/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', 'long123456789', {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
class Order extends Model {}
Order.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
    },
    flashsaleId: {
      type: DataTypes.INTEGER,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemImg: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    itemDiscount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    itemNewPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attributeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attributeColor: {
      type: DataTypes.STRING,
    },
    attributeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'orders',
    timestamps: false,
  },
);

module.exports = Order;
