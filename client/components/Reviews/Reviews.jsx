import React from 'react';
import useAPI from '../../hooks/useAPI';
import Heading from './Heading';
import Text from './Text';
import Footer from './Footer';

const Reviews = ({ product_id }) => {
  const apiData = useAPI(`http://localhost:3001/api/reviews/${product_id}`);

  if (apiData) {
    const { review_heading, review_text, username } = apiData[0];
    return (
      <div className="reviews-container">
        <Heading review_heading={review_heading} />
        <Text review_text={review_text} />
        <Footer username={username} />
      </div>
    );
  }

  return <div className="reviews-container" />;
};

export default Reviews;
