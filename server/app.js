const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api/reviews', require('./routes/reviews.js'));

module.exports = app;
