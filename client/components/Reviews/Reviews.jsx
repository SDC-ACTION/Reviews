import React from 'react';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';
import Heading from './Heading';
import PostDate from './PostDate';
import Text from './Text/Text';
import Footer from './Footer';

const StyledReviewWrapper = styled.div`
  font-size: 14px;
  margin: 34px 0px 0px 0px;
`;

const Reviews = ({ product_id }) => {
  const apiData = useAPI(`http://localhost:3001/api/reviews/${product_id}`);
  if (apiData) {
    const {
      review_heading,
      review_text,
      username,
      created_at,
    } = apiData[0];

    return (
      <StyledReviewWrapper>
        <Heading review_heading={review_heading} />
        <PostDate created_at={created_at} />
        <Text review_text={review_text} />
        <Footer username={username} />
      </StyledReviewWrapper>
    );
  }

  return <div className="reviews-container" />;
};

export default Reviews;
