import React from 'react';

const Reviews = ({ product_id }) => (
  <div className="reviews-container">
    {`Reviews Component. We have a product_id prop '${product_id}' that has a typeof ${typeof product_id}`}
  </div>
);

export default Reviews;
