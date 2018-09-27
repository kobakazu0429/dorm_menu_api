exports.getTimeJST = () => {
  const moment = require('moment-timezone');
  return moment()
    .utc()
    .add(9, 'h');
};
