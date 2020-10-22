import React from 'react';
import styled from 'styled-components';

const StyledStarText = styled.div`
  color: #1a73e8;
  display: inline-block;
`;

const LinkStarText = ({ star }) => (
  <StyledStarText>{`${star} star`}</StyledStarText>
);

export default LinkStarText;
