import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LinkText from './LinkText';

const StyledReviewText = styled.p`
  display: ${(props) => props.display};
  margin: 0px;
`;

const Text = ({ text, display, setDisplay }) => {
  const pressLink = () => {
    setDisplay({
      shortDisplay: (display) ? null : 'none',
      longDisplay: (display) ? 'none' : null,
    });
  };

  const [linkText, setLinkText] = useState(null);

  useEffect(() => {
    if (setDisplay) {
      setLinkText((display)
        ? <LinkText pressLink={pressLink} linkText="Less" />
        : <LinkText pressLink={pressLink} linkText="More" />);
    }
  }, []);

  return (
    <StyledReviewText display={display}>
      {text}
      &nbsp;
      {linkText}
    </StyledReviewText>
  );
};

export default Text;
