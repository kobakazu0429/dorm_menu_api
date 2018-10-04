const axios = require('axios');

const utils = require('./utils');
const db = require('./db');
const parse = require('./parse');

const isLinkAlive = async path => {
  const res = await axios.get(path);
  if (res.status === 200) return true;
  return false;
};

const main = async () => {
  const now = utils.getTimeJST();
  const year = now.get('year');
  const m = now.get('month') + 1;
  const _m = '0' + m;

  if (await db.is_saved(year, m)) {
    console.log(`${year}/${m} exsit`);
    process.exit(0);
  }

  const path = `https://www.kure-nct.ac.jp/life/dorm/pdf/${_m.slice(-2)}_menu.pdf`;

  if (!(await isLinkAlive(path))) {
    console.error('Unexisted Menu File Now');
    return;
  }
  const pdfData = await parse(path);

  for (menu in pdfData) {
    const { morning, lunch, dinnerA, dinnerB, dinnerAB } = pdfData[menu];
    const [month, day] = menu.split(/月|日/);
    await db.create({
      year: year,
      month: month,
      day: day,
      morning: morning,
      lunch: lunch,
      dinnerA: dinnerA,
      dinnerB: dinnerB,
      dinnerAB: dinnerAB
    });
  }
  console.log('Done');

  await db.to_saved(year, m);
  console.log(`${year}/${m} is saved => true`);

  process.exit(0);
};

module.exports = main;
