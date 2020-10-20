import React from 'react';
import styled from 'styled-components';
import useAPI from '../hooks/useAPI';
import Title from './Title';
import AverageRating from './ReviewSummary/AverageRating';
import SearchReviews from './SearchReviews/SearchReviews';
import Reviews from './Reviews/Reviews';

const StyledWrapper = styled.div`
  color: #222;
  font-family: 'Roboto', arial, sans-serif;
  min-width: 914px;
  max-width: 1024px;
`;

const App = ({ match }) => {
  const reviewSummaryData = useAPI(`http://localhost:3001/api/reviews/${match.params.id}/summary`);

  return (
    <StyledWrapper>
      <Title />
      <AverageRating reviewSummary={reviewSummaryData} />
      <SearchReviews />
      <Reviews product_id={match.params.id} />
    </StyledWrapper>
  );
};

export default App;
