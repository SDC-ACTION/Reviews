import React from 'react';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';
import Heading from './Heading';
import Rating from './Rating/Rating';
import TextBox from './TextBox/TextBox';
import Footer from './Footer';
import AllReviews from './AllReviews';

const StyledReviewWrapper = styled.div`
  font-size: 14px;
  margin: 34px 0px 0px 0px;
`;

const Reviews = ({ product_id }) => {
  const apiData = useAPI(`${process.env.API_URL}/${product_id}?limit=1`);
  if (apiData) {
    const {
      created_at,
      review_heading,
      review_rating,
      review_text,
      username,
    } = apiData[0];

    return (
      <StyledReviewWrapper>
        <Heading review_heading={review_heading} />
        <Rating review_rating={review_rating} created_at={created_at} />
        <TextBox review_text={review_text} />
        <Footer username={username} />
        <AllReviews />
      </StyledReviewWrapper>
    );
  }

  return <StyledReviewWrapper />;
};

export default Reviews;
