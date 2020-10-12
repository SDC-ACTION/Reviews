import React from 'react';

const SearchReviews = ({ product_id }) => (
  <div className="search-reviews-container">
    {`SearchReviews Component. We have a product_id prop '${product_id}' that has a typeof ${typeof product_id}`}
  </div>
);

export default SearchReviews;
