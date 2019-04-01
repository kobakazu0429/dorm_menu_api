import express = require("express");
import sequelize from "./sequelize";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ response: "ok" });
});

(async () => {
  await sequelize.sync({ force: true });

  app.listen(port, () => {
    console.log(`You can see here: http://localhost:${port}`);
  });
})();
