const { Sequelize } = require('sequelize');

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
async function Connect() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connected to Database....');
  } catch (err) {
    if (err) {
      throw err;
    }
  }
}
module.exports = Connect;
