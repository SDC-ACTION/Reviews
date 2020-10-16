import React from 'react';
import StyledReviewText from './StyledReviewText';
import LinkText from './LinkText';

const ShortText = ({ text, display, setDisplay }) => {
  const pressLink = () => {
    setDisplay({
      shortDisplay: 'none',
      longDisplay: null,
    });
  };

  const linkText = (setDisplay)
    ? <LinkText pressLink={pressLink} linkText="More" />
    : null;

  return (
    <StyledReviewText display={display}>
      {text}
      &nbsp;
      {linkText}
    </StyledReviewText>
  );
};

export default ShortText;
