import React from 'react';

const ReviewSummary = ({ product_id }) => (
  <div className="review-summary-container">
    {`ReviewSummary Component. We have a product_id prop '${product_id}' that has a typeof ${typeof product_id}`}
  </div>
);

export default ReviewSummary;
