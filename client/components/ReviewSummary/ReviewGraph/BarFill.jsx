import React from 'react';
import styled from 'styled-components';

const StyledBarBackground = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 8px;
`;

const StyledBarFill = styled.div`
  background-color: #e7711b;
  border-radius: 4px;
  height: 8px;
`;

const BarFill = ({ total_reviews, reviewCount }) => (
  <StyledBarBackground>
    <StyledBarFill style={{ width: `${(reviewCount / total_reviews) * 342}px` }} />
  </StyledBarBackground>
);

export default BarFill;
