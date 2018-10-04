const env = require('./env');

const utils = require('./utils');
const MenuModel = require('./models/menu');
const SaveModel = require('./models/save');

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

const colums = ['id', 'year', 'month', 'day', 'morning', 'lunch', 'dinnerA', 'dinnerB', 'dinnerAB'];

// Define Models ==============================================================
const Menu = sequelize.define('menu', MenuModel);
const IsSave = sequelize.define('save', SaveModel);
// ============================================================================

exports.get_all = () => {
  return sequelize
    .sync({ alter: true })
    .then(() => Menu.findAll({ attributes: colums }))
    .then(result => result.map(e => e.toJSON()));
};

exports.get_next = () => {
  const now = utils.getTimeJST();

  const y = now.get('year');
  const m = now.get('month') + 1;
  const d = now.get('date');
  const h = now.get('hour');

  const defaultAttributes = ['id', 'year', 'month', 'day'];
  let attributes = null;
  let where = { year: y, month: m, day: d };

  if (h <= 9 || h > 20) {
    attributes = defaultAttributes.concat(['morning']);

    if (h > 20) {
      if (now.add(1, 'day').get('date') === 1) {
        where.year = now.get('year');
        where.month = now.get('month');
        where.day = now.get('date');
      } else {
        where.day += 1;
      }
    }
  } else if (h <= 14 && h > 9) {
    attributes = defaultAttributes.concat(['lunch']);
  } else if (h <= 20 && h > 14) {
    attributes = defaultAttributes.concat(['dinnerA', 'dinnerB', 'dinnerAB']);
  }

  if (!(defaultAttributes === attributes)) {
    return sequelize
      .sync({ alter: true })
      .then(() =>
        Menu.find({
          attributes: attributes,
          where: where
        })
      )
      .then(result => result.toJSON());
  }

  throw new Error('Unexpected Error');
};

exports.get_that_day = (y, m, d) => {
  return sequelize
    .sync({ alter: true })
    .then(() => Menu.find({ attributes: colums, where: { year: y, month: m, day: d } }))
    .then(result => result.toJSON());
};

exports.create = async data => {
  await sequelize.sync({ alter: true }).then(() =>
    Menu.create({
      year: data.year,
      month: data.month,
      day: data.day,
      morning: data.morning,
      lunch: data.lunch,
      dinnerA: data.dinnerA,
      dinnerB: data.dinnerB,
      dinnerAB: data.dinnerAB
    })
  );
};

exports.is_saved = (y, m) => {
  return sequelize
    .sync({ alter: true })
    .then(() => IsSave.find({ attributes: 'isSaved', where: { year: y, month: m } }))
    .then(result => result.toJSON());
};

exports.to_saved = async (y, m) => {
  await sequelize.sync({ alter: true }).then(() =>
    IsSave.create({
      year: y,
      month: m,
      isSaved: true
    })
  );
};
