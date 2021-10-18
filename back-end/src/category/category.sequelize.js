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
class Category extends Model {}
Category.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: STATUS.active,
    },
    banner: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    icon: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'category',
    timestamps: false,
  },
);

module.exports = Category;
