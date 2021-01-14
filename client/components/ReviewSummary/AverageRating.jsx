import React from 'react';
import styled from 'styled-components';
import Stars from '../Reviews/Rating/Stars';

const StyledAverageRatingContainer = styled.div`
  display: inline-block;
  float: left;
  height: 100px;
  padding-right: 24px;
  width: 70px;
`;

const StyledLayout = styled.div`
  display: grid;
  justify-items: center;
`;

const StyledAverageRating = styled.p`
  color: #333;
  font-size: 48px;
  line-height: 48px;
  margin: 0;
  text-align: center;
`;

const StyledTotalReviews = styled.p`
  color: #757575;
  font-size: 12px;
  margin: 5px 0px 0px 0px;
  padding-right: 4px;
  text-align: center;
`;

const AverageRating = ({ reviewSummary }) => {
  const averageRating = (
    reviewSummary.rating_1 * 1
    + reviewSummary.rating_2 * 2
    + reviewSummary.rating_3 * 3
    + reviewSummary.rating_4 * 4
    + reviewSummary.rating_5 * 5) / reviewSummary.total_reviews;

  const reviewWord = (reviewSummary.total_reviews === 1) ? 'review' : 'reviews';
  const totalReviews = reviewSummary.total_reviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <StyledAverageRatingContainer>
      <StyledLayout>
        <StyledAverageRating>{averageRating.toFixed(1)}</StyledAverageRating>
        <Stars review_rating={averageRating} />
        <StyledTotalReviews>{`${totalReviews} ${reviewWord}`}</StyledTotalReviews>
      </StyledLayout>
    </StyledAverageRatingContainer>
  );
};

export default AverageRating;
