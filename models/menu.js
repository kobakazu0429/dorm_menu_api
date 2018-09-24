const Sequelize = require('sequelize');

module.exports = {
  year: Sequelize.INTEGER,
  month: Sequelize.INTEGER,
  day: Sequelize.INTEGER,
  week: Sequelize.INTEGER,
  morning: Sequelize.STRING,
  lunch: Sequelize.STRING,
  dinnerA: Sequelize.STRING,
  dinnerB: Sequelize.STRING,
  dinnerAB: Sequelize.STRING
};
