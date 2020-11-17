const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api/reviews', require('./routes/reviews.js'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
