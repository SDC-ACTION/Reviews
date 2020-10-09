const express = require('express');

const app = express();

app.use('/api/reviews', require('./routes/reviews.mock.js'));
app.use('/api/reviewsummary', require('./routes/reviewsummary.mock.js'));

module.exports = app;
