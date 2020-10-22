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
  width: ${({ width }) => width * 342}px;
`;

const BarFill = ({ total_reviews, reviewCount }) => (
  <StyledBarBackground>
    <StyledBarFill width={reviewCount / total_reviews} />
  </StyledBarBackground>
);

export default BarFill;
