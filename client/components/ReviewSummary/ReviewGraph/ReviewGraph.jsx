import React from 'react';
import styled from 'styled-components';
import GraphLink from './GraphLink';
import { StyledBarWrapper } from './LinkReviewBar';
import { StyledReviewCount } from './LinkReviewCount';

const StyledReviewGraphContainer = styled.div`
  display: inline-block;
  height: 100px;
`;

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 1f 1f 1f 1f 1f;
  height: 100%;

  >:hover ${StyledReviewCount} {
    visibility: visible;
  }

  &:hover ${StyledBarWrapper} {
    opacity: 0.3;
  }

  >:hover ${StyledBarWrapper} {
    opacity: 1;
  }
`;

const ReviewGraph = ({ reviewSummary }) => {
  const {
    rating_5,
    rating_4,
    rating_3,
    rating_2,
    rating_1,
    total_reviews,
  } = reviewSummary[0];

  return (
    <StyledReviewGraphContainer>
      <StyledLayout>
        <GraphLink star={5} count={rating_5} total={total_reviews} />
        <GraphLink star={4} count={rating_4} total={total_reviews} />
        <GraphLink star={3} count={rating_3} total={total_reviews} />
        <GraphLink star={2} count={rating_2} total={total_reviews} />
        <GraphLink star={1} count={rating_1} total={total_reviews} />
      </StyledLayout>
    </StyledReviewGraphContainer>
  );
};

export default ReviewGraph;
