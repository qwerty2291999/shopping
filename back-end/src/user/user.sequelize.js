/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes, Model } = require('sequelize');
const { hashPass } = require('../../functions/bcrypt');
const { upperFirstLetter } = require('../../functions/strings');

const ROLE = {
  user: 'user',
  admin: 'admin',
};
const VERIFY = {
  verified: 'verified',
  verifyneeded: 'verify needed',
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
class Users extends Model {}
Users.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verify: {
      type: DataTypes.STRING,
      defaultValue: VERIFY.verifyneeded,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    modelName: 'users',
    timestamps: false,
  },
);
Users.beforeSave(async (user) => {
  user.name = upperFirstLetter(user.name);
  user.password = await hashPass(user.password);
});
Users.beforeBulkUpdate(async (user) => {
  if (user.attributes.name) {
    user.attributes.name = upperFirstLetter(user.attributes.name);
  }
  if (user.attributes.password) {
    user.attributes.password = await hashPass(user.attributes.password);
  }
});

module.exports = Users;
