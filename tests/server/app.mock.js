const express = require('express');

const app = express();

app.use('/api/reviews', require('./routes/reviews.mock.js'));

module.exports = app;
