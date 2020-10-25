import React from 'react';
import styled from 'styled-components';

const StyledReviewCount = styled.div`
  color: #222;
  display: inline-block;
  padding-left: 10px;
  visibility: hidden;
`;

const LinkReviewCount = ({ reviewCount }) => {
  const reviewWord = reviewCount === 1 ? 'review' : 'reviews';
  const formatReviewCount = reviewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <StyledReviewCount>
      {`${formatReviewCount} ${reviewWord}`}
    </StyledReviewCount>
  );
};

export { LinkReviewCount, StyledReviewCount };
