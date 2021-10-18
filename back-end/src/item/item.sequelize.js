/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  'postgres',
  'long123456789',
  {
    host: process.env.HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);
class Items extends Model {}
Items.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    importPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellingPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mainimg: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    detailimgs: {
      type: DataTypes.JSON,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    desciption: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'items',
    timestamps: false,
  },
);

module.exports = Items;
