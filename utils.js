exports.getTimeJST = () => {
  process.env.TZ = 'Asia/Tokyo';
  const date = new Date();
  if (process.env.TZ === 'Asia/Tokyo') return date;
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
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
