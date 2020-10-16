import React from 'react';
import StyledReviewText from './StyledReviewText';

const LongText = ({ text, display }) => (
  <StyledReviewText display={display}>{text}</StyledReviewText>
);

export default LongText;
