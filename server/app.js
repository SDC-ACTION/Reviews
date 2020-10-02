const express = require('express');

const app = express();

app.use('/reviews', require('./routes/reviews.js'));

module.exports = app;
