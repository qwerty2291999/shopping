/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes, Model } = require('sequelize');

const ROLE = {
  manager: 'manager',
  admin: 'admin',
};
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
class Roles extends Model {}
Roles.init(
  {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: ROLE.manager,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'roles',
    timestamps: false,
  },
);

module.exports = Roles;
