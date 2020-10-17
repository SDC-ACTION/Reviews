import React from 'react';
import styled from 'styled-components';
import starsFill from '../../../images/star-fill';
import starsBlank from '../../../images/star-blank';

const StyledStarContainer = styled.div`
  float: left;
  height: 20px;
  position: relative;
  width: 60px;
`;

const StyledStars = styled.div`
  background-image: url('${({ starImg }) => starImg}');
  background-repeat: repeat-x;
  background-size: contain;
  bottom: 0;
  height: 12px;
  margin: auto;
  position: absolute;
  top: 0;
  width: ${({ rating }) => rating * 12}px;
`;

const Stars = ({ review_rating }) => (
  <StyledStarContainer>
    <StyledStars rating={5} starImg={starsBlank} />
    <StyledStars rating={review_rating} starImg={starsFill} />
  </StyledStarContainer>
);

export default Stars;
