require('dotenv').config();

const env = {
  USER: process.env.USER,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.PORT,
  DIALECT: process.env.DIALECT
};

module.exports = env;
