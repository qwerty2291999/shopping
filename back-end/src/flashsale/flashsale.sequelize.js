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
class Sale extends Model {}
Sale.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.INTEGER,
    },
    itemImg: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    itemSalePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemNewPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: STATUS.inactive,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'flashsale',
    timestamps: false,
  },
);

module.exports = Sale;
