import React, { useState } from 'react';
import styled from 'styled-components';
import LinkStarText from '../LinkStarText';
import { LinkReviewBar } from '../LinkReviewBar';
import { LinkReviewCount } from '../LinkReviewCount';

const StyledGraphLink = styled.a`
  border: 2px solid;
  border-color: ${({ borderStyle }) => borderStyle};
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  height: 100%;
  line-height: 20px;
  margin: -2px;
`;

const GraphLink = ({ star, count, total }) => {
  const [borderStyle, setBorderStyle] = useState('transparent');

  return (
    <StyledGraphLink
      borderStyle={borderStyle}
      onMouseDown={() => setBorderStyle('solid')}
      onMouseUp={() => setBorderStyle('transparent')}
    >
      <LinkStarText star={star} />
      <LinkReviewBar
        reviewCount={count}
        total_reviews={total}
      />
      <LinkReviewCount reviewCount={count} />
    </StyledGraphLink>
  );
};

export default GraphLink;
