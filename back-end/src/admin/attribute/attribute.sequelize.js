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
class Attribute extends Model {}
Attribute.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'itemAttributes',
    timestamps: false,
  },
);

module.exports = Attribute;
