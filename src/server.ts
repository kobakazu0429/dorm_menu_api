import { createServer } from "http";
import { scheduleJob } from "node-schedule";

import { app } from "./app";
import sequelize from "./sequelize";

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync();

  createServer(app).listen(port, () => {
    console.info(`You can see here: http://localhost:${port}`);

    scheduleJob(
      {
        second: 0,
        minute: 0,
        hour: 0
      },
      () => {
        console.log("This is Cron.");
      }
    );
  });
})();
