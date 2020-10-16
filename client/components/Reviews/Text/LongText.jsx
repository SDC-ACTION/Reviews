import React from 'react';
import StyledReviewText from './StyledReviewText';
import LinkText from './LinkText';

const LongText = ({ text, display, setDisplay }) => {
  const pressLink = () => {
    setDisplay({
      shortDisplay: null,
      longDisplay: 'none',
    });
  };

  const linkText = (setDisplay)
    ? <LinkText pressLink={pressLink} linkText="Less" />
    : null;

  return (
    <StyledReviewText display={display}>
      {text}
      &nbsp;
      {linkText}
    </StyledReviewText>
  );
};

export default LongText;
