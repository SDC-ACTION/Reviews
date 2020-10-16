import React from 'react';
import styled from 'styled-components';

const StyledPostDate = styled.p`
  color: #757575;
  font-size: 13px;
  margin: 12px 0px;
`;

const PostDate = ({ created_at }) => {
  const date = new Date(created_at);
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return (
    <StyledPostDate>{date.toLocaleDateString('en-US', dateOptions)}</StyledPostDate>
  );
};

export default PostDate;
