const express = require('express');
const db = require('../database');

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  db.reviewsTable.addReview({ review_rating: 5, username: 'Test2', product_id: 2 });
  res.end();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
