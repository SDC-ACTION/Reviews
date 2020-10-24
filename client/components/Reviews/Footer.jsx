import React from 'react';
import styled from 'styled-components';

const StyledReviewFooter = styled.div`
  color: #757575;
  margin: 0px;
  padding: 12px 0px 24px 0px;
`;

const Footer = ({ username }) => (
  <StyledReviewFooter>{username}</StyledReviewFooter>
);

export default Footer;
