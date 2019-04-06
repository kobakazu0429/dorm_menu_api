import { createServer } from "http";

import { app } from "./app";
import sequelize from "./sequelize";

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync();

  createServer(app).listen(port, () =>
    console.info(`You can see here: http://localhost:${port}`)
  );
})();
