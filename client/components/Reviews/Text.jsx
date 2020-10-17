import React from 'react';
import styled from 'styled-components';

const StyledReviewText = styled.p`
  margin: 0px;
`;

const Text = ({ review_text }) => (
  <StyledReviewText>{review_text}</StyledReviewText>
);

export default Text;
