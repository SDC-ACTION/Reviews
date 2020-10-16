import React from 'react';
import styled from 'styled-components';

const StyledReviewFooter = styled.p`
  margin: 0px;
  padding: 12px 0px 12px 0px;
  color: #757575;
`;

const Footer = ({ username }) => (
  <StyledReviewFooter>{username}</StyledReviewFooter>
);

export default Footer;
