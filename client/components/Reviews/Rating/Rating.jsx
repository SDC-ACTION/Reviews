import React from 'react';
import styled from 'styled-components';
import PostDate from './PostDate';
import Stars from './Stars';

const StyledRating = styled.div`
  height: 20px;
  margin: 12px 0px;
`;

const Rating = ({ review_rating, created_at }) => (
  <StyledRating>
    <Stars review_rating={review_rating} />
    <PostDate created_at={created_at} />
  </StyledRating>
);

export default Rating;
