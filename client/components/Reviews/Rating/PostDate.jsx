import React from 'react';
import styled from 'styled-components';

const StyledPostDate = styled.span`
  color: #757575;
  font-size: 13px;
  line-height: 22px;
  margin: 0px 0px 0px 8px;
  position: relative;
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
