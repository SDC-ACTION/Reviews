import React from 'react';
import styled from 'styled-components';
import ReviewSummary from './ReviewSummary/ReviewSummary';
import SearchReviews from './SearchReviews/SearchReviews';
import Reviews from './Reviews/Reviews';

const StyledWrapper = styled.div`
  color: #222;
  font-family: 'Roboto', arial, sans-serif;
  max-width: 1024px;
`;

const App = ({ match }) => (
  <StyledWrapper className="app-container">
    <ReviewSummary product_id={Number(match.params.id)} />
    <SearchReviews product_id={Number(match.params.id)} />
    <Reviews product_id={Number(match.params.id)} />
  </StyledWrapper>
);

export default App;
