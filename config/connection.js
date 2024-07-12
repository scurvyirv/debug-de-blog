const Sequelize = require('sequelize');
require('dotenv').config();

//store sensitive user data to env
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL) //connection to database once deployed
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );

module.exports = sequelize;