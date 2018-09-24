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
  const m = now.getMonth() + 1;
  const _m = '0' + m;
  const path = `https://www.kure-nct.ac.jp/life/dorm/pdf/${_m.slice(-2)}_menu.pdf`;

  if (!(await isLinkAlive(path))) {
    console.error('Unexisted Menu File Now');
    return;
  }
  const pdfData = await parse(path);

  for (menu in pdfData) {
    const { week, morning, lunch, dinnerA, dinnerB, dinnerAB } = pdfData[menu];
    const year = now.getFullYear();
    const [month, day] = menu.split(/月|日/);

    db.create({
      year: year,
      month: month,
      day: day,
      week: utils.enumWeek(week),
      morning: morning,
      lunch: lunch,
      dinnerA: dinnerA,
      dinnerB: dinnerB,
      dinnerAB: dinnerAB
    });
  }
};

main();
