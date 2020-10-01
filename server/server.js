const express = require('express');
const db = require('../database');

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  res.end();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
