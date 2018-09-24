exports.getTimeJST = () => {
  const moment = require('moment-timezone');
  return moment().tz('Asia/Tokyo');
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
