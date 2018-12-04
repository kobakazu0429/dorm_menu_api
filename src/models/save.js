const Sequelize = require('sequelize');

module.exports = {
  year: Sequelize.INTEGER,
  month: Sequelize.INTEGER,
  isSaved: Sequelize.BOOLEAN
};
