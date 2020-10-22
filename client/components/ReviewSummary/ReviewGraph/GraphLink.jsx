import React, { useState } from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import LinkStarText from './LinkStarText';
import LinkReviewBar from './LinkReviewBar';
import LinkReviewCount from './LinkReviewCount';

const StyledGraphLink = styled.a`
  border: 2px solid;
  border-color: ${({ borderStyle }) => borderStyle};
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  line-height: 20px;
  margin: -2px;
`;

const GraphLink = ({
  star, count, total, opacity,
}) => {
  const [borderStyle, setBorderStyle] = useState('transparent');
  const [countDisplay, setCountDisplay] = useState('hidden');
  const [ifHover, setifHover] = useState(false);

  GraphLink[`handleClickOutside_rating${star}`] = () => setBorderStyle('transparent');

  const linkMouseEnter = () => {
    setCountDisplay(null);
    setifHover(true);
  };

  const linkMouseLeave = () => {
    setCountDisplay('hidden');
    setifHover(false);
  };

  return (
    <StyledGraphLink
      borderStyle={borderStyle}
      onMouseEnter={linkMouseEnter}
      onMouseLeave={linkMouseLeave}
      onMouseDown={() => setBorderStyle('solid')}
      onMouseUp={() => setBorderStyle('transparent')}
    >
      <LinkStarText star={star} />
      <LinkReviewBar
        reviewCount={count}
        total_reviews={total}
        opacity={opacity}
        hoverCheck={ifHover}
      />
      <LinkReviewCount reviewCount={count} display={countDisplay} />
    </StyledGraphLink>
  );
};

const clickOutsideConfig = {
  handleClickOutside: ({ props }) => GraphLink[`handleClickOutside_rating${props.star}`],
};

export default onClickOutside(GraphLink, clickOutsideConfig);
