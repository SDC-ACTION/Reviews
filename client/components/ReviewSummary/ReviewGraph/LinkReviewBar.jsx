import React from 'react';
import styled from 'styled-components';
import BarFill from './BarFill';

const StyledBarWrapper = styled.div`
  display: inline-block;
  opacity: ${({ opacity }) => opacity};
  padding-left: 10px;
  width: 342px;
`;

const LinkReviewBar = ({
  total_reviews, reviewCount, opacity, hoverCheck,
}) => {
  const setOpacity = (hoverCheck) ? 1 : opacity;

  return (
    <StyledBarWrapper opacity={setOpacity}>
      <BarFill total_reviews={total_reviews} reviewCount={reviewCount} />
    </StyledBarWrapper>
  );
};

export default LinkReviewBar;
