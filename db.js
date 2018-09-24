const env = require('./env');

const utils = require('./utils');
const MenuModel = require('./models/menu');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.DATABASE, env.USER, env.PASSWORD, {
  host: env.HOST,
  dialect: env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  operatorsAliases: false
});

const colums = ['id', 'year', 'month', 'day', 'week', 'morning', 'lunch', 'dinnerA', 'dinnerB', 'dinnerAB'];

// Define Models ==============================================================
const Menu = sequelize.define('menu', MenuModel);
// ============================================================================

exports.get_all = () => {
  return sequelize
    .sync()
    .then(() => Menu.findAll({ attributes: colums }))
    .then(result => result.map(e => e.toJSON()));
};

exports.get_next = () => {
  const now = utils.getTimeJST();

  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const h = now.getHours();

  let defaultAttributes = ['id', 'year', 'month', 'day', 'week'];
  let attributes = null;

  if (h <= 9 || h > 20) {
    attributes = defaultAttributes.concat(['morning']);
  }

  if (h <= 14 || h > 9) {
    attributes = defaultAttributes.concat(['lunch']);
  }

  if (h <= 20 || h > 14) {
    attributes = defaultAttributes.concat(['dinnerA', 'dinnerB', 'dinnerAB']);
  }

  if (!(defaultAttributes === attributes)) {
    return sequelize
      .sync()
      .then(() =>
        Menu.find({
          attributes: attributes,
          where: { year: y, month: m, day: d }
        })
      )
      .then(result => result.toJSON());
  }

  throw new Error('Unexpected Error');
};

exports.get_that_day = (y, m, d) => {
  return sequelize
    .sync()
    .then(() => Menu.find({ attributes: colums, where: { year: y, month: m, day: d } }))
    .then(result => result.toJSON());
};

exports.create = data => {
  sequelize.sync().then(() =>
    Menu.create({
      year: data.year,
      month: data.month,
      day: data.day,
      week: data.week,
      morning: data.morning,
      lunch: data.lunch,
      dinnerA: data.dinnerA,
      dinnerB: data.dinnerB,
      dinnerAB: data.dinnerAB
    })
  );
};
