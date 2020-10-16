import React from 'react';
import styled from 'styled-components';

const StyledReviewHeading = styled.p`
  margin: 0px;
`;

const Heading = ({ review_heading }) => (
  <StyledReviewHeading>{review_heading}</StyledReviewHeading>
);

export default Heading;
