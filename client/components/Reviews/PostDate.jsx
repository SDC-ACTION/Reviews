import React from 'react';
import styled from 'styled-components';

const StyledPostDate = styled.p`
  color: #757575;
  font-size: 13px;
  margin: 12px 0px;
`;

const PostDate = ({ created_at }) => (
  <StyledPostDate>{created_at}</StyledPostDate>
);

export default PostDate;
