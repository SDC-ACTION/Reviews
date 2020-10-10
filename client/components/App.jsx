import React from 'react';
import ReviewSummary from './ReviewSummary/ReviewSummary';
import SearchReviews from './SearchReviews/SearchReviews';
import Reviews from './Reviews/Reviews';

const App = () => (
  <div className="app-container">
    <ReviewSummary />
    <SearchReviews />
    <Reviews />
  </div>
);

export default App;
