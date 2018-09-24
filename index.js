const express = require('express');
const app = express();

const db = require('./db');

const server = app.listen(3000, () => {
  console.log(`You can see here:\nhttp://localhost:${server.address().port}`);
});

app.get('/all', async (req, res) => {
  res.json(await db.get_all());
});

app.get('/next', async (req, res) => {
  res.json(await db.get_next());
});

app.get('/:year/:month/:day', async (req, res) => {
  res.json(await db.get_that_day(req.params.year, req.params.month, req.params.day));
});

// app.get('/count', async (req, res) => {}
