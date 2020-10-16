import React from 'react';
import StyledReviewText from './StyledReviewText';

const ShortText = ({ text, display }) => (
  <StyledReviewText display={display}>{text}</StyledReviewText>
);

export default ShortText;
