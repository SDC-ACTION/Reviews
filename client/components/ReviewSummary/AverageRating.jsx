import React from 'react';
import styled from 'styled-components';
import Stars from '../Reviews/Rating/Stars';

const StyledAverageRatingContainer = styled.div`
  display: inline-block;
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
  height: 48px;
  margin: 0;
  padding-bottom: 3px;
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
  if (reviewSummary) {
    const averageRating = (
      reviewSummary[0].rating_1 * 1
      + reviewSummary[0].rating_2 * 2
      + reviewSummary[0].rating_3 * 3
      + reviewSummary[0].rating_4 * 4
      + reviewSummary[0].rating_5 * 5) / reviewSummary[0].total_reviews;

    const reviewWord = (reviewSummary[0].total_reviews === 1) ? 'review' : 'reviews';
    const totalReviews = reviewSummary[0].total_reviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
      <StyledAverageRatingContainer>
        <StyledLayout>
          <StyledAverageRating>{averageRating.toFixed(1)}</StyledAverageRating>
          <Stars review_rating={averageRating} />
          <StyledTotalReviews>{`${totalReviews} ${reviewWord}`}</StyledTotalReviews>
        </StyledLayout>
      </StyledAverageRatingContainer>
    );
  }

  return <div />;
};

export default AverageRating;
