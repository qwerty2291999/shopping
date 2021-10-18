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
class Forgot extends Model {}
Forgot.init(
  {
    expiresAt: {
      type: DataTypes.DATE,
      unique: true,
    },
    code: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: STATUS.verifyneeded,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'forgotpass',
    timestamps: false,
  },
);
module.exports = Forgot;
