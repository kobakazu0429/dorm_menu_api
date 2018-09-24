exports.getTimeJST = () => {
  process.env.TZ = 'Asia/Tokyo';
  const moment = require('moment-timezone');
  const date = moment()
    .tz('Asia/Tokyo')
    .format();
  return date;
};

exports.enumWeek = str => {
  const _enum = {
    月: 10,
    火: 20,
    水: 30,
    木: 40,
    金: 50,
    土: 60,
    日: 70
  };
  return _enum[str];
};
