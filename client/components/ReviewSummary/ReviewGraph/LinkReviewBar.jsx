import React from 'react';
import styled from 'styled-components';
import BarFill from './BarFill';

const StyledBarWrapper = styled.div`
  display: inline-block;
  padding-left: 10px;
  width: 342px;
`;

const LinkReviewBar = ({ total_reviews, reviewCount }) => (
  <StyledBarWrapper>
    <BarFill total_reviews={total_reviews} reviewCount={reviewCount} />
  </StyledBarWrapper>
);

export { LinkReviewBar, StyledBarWrapper };
