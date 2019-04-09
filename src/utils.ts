import axios from "axios";
import moment = require("moment-timezone");

export const getTimeJST = () => {
  return moment()
    .utc()
    .add(9, "h");
};

export const isLinkAlived = async (path: string) => {
  const res = await axios.get(path);
  if (res.status === 200) return true;
  return false;
};
