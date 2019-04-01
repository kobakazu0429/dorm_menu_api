import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import { DB_CONFIG } from "./env";

const sequelize = new Sequelize({
  dialect: "postgres",
  operatorsAliases: Op,
  host: DB_CONFIG.HOST,
  database: DB_CONFIG.DATABASE,
  username: DB_CONFIG.USER,
  password: DB_CONFIG.PASSWORD,
  port: DB_CONFIG.DB_PORT,
  models: [__dirname + "/models"]
});

export default sequelize;
