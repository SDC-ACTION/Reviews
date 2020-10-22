import React from 'react';
import styled from 'styled-components';

const StyledReviewCount = styled.div`
  color: #222;
  display: inline-block;
  padding-left: 10px;
  visibility: ${({ display }) => display};
`;

const LinkReviewCount = ({ reviewCount, display }) => {
  const reviewWord = reviewCount === 1 ? 'review' : 'reviews';
  const formatReviewCount = reviewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <StyledReviewCount display={display}>
      {`${formatReviewCount} ${reviewWord}`}
    </StyledReviewCount>
  );
};

export default LinkReviewCount;
