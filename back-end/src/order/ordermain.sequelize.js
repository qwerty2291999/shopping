/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes, Model } = require('sequelize');
const { STATUS } = require('../../configs/enum');

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
class OrderMain extends Model {}
OrderMain.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: STATUS.awaitpurchase,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userPhoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'ordersmain',
    timestamps: false,
  },
);

module.exports = OrderMain;
