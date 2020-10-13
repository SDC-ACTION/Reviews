import React from 'react';
import ReviewSummary from './ReviewSummary/ReviewSummary';
import SearchReviews from './SearchReviews/SearchReviews';
import Reviews from './Reviews/Reviews';

const App = ({ match }) => (
  <div className="app-container">
    <ReviewSummary product_id={Number(match.params.id)} />
    <SearchReviews product_id={Number(match.params.id)} />
    <Reviews product_id={Number(match.params.id)} />
  </div>
);

export default App;
