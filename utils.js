exports.getTimeJST = () => {
  process.env.TZ = 'Asia/Tokyo';
  const date = new Date();
  if (process.env.TZ === 'Asia/Tokyo') return date;
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};
