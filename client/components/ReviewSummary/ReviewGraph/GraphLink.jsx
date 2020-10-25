import React, { useState } from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import LinkStarText from './LinkStarText';
import { LinkReviewBar } from './LinkReviewBar';
import { LinkReviewCount } from './LinkReviewCount';

const StyledGraphLink = styled.a`
  border: 2px solid;
  border-color: ${({ borderStyle }) => borderStyle};
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  line-height: 20px;
  margin: -2px;
`;

const GraphLink = ({ star, count, total }) => {
  const [borderStyle, setBorderStyle] = useState('transparent');

  GraphLink[`handleClickOutside_rating${star}`] = () => setBorderStyle('transparent');

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

const clickOutsideConfig = {
  handleClickOutside: ({ props }) => GraphLink[`handleClickOutside_rating${props.star}`],
};

export default onClickOutside(GraphLink, clickOutsideConfig);
