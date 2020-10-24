import React, { useState } from 'react';
import styled from 'styled-components';
import GraphLink from './GraphLink';

const StyledReviewGraphContainer = styled.div`
  display: inline-block;
  height: 100px;
`;

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 1f 1f 1f 1f 1f;
  height: 100%;
`;

const ReviewGraph = ({ reviewSummary }) => {
  const [graphOpacity, setGraphOpacity] = useState(1);

  const mouseOverGraph = () => {
    setGraphOpacity(0.3);
  };

  const mouseLeaveGraph = () => {
    setGraphOpacity(1);
  };

  const {
    rating_5,
    rating_4,
    rating_3,
    rating_2,
    rating_1,
    total_reviews,
  } = reviewSummary[0];

  return (
    <StyledReviewGraphContainer
      onMouseOver={mouseOverGraph}
      onMouseLeave={mouseLeaveGraph}
    >
      <StyledLayout>
        <GraphLink star={5} count={rating_5} total={total_reviews} opacity={graphOpacity} />
        <GraphLink star={4} count={rating_4} total={total_reviews} opacity={graphOpacity} />
        <GraphLink star={3} count={rating_3} total={total_reviews} opacity={graphOpacity} />
        <GraphLink star={2} count={rating_2} total={total_reviews} opacity={graphOpacity} />
        <GraphLink star={1} count={rating_1} total={total_reviews} opacity={graphOpacity} />
      </StyledLayout>
    </StyledReviewGraphContainer>
  );
};

export default ReviewGraph;
