import React, { useState } from 'react';
import styled from 'styled-components';
import Text from './Text';

const StyledTextWrapper = styled.div`
  line-height: 20px;
  margin: 0px;
`;

const TextBox = ({ review_text }) => {
  const [display, setDisplay] = useState({
    shortDisplay: null,
    longDisplay: 'none',
  });

  let shortText = null;
  let longText = null;

  if (review_text.length > 800) {
    const splitIndex = review_text.lastIndexOf(' ', 800);

    shortText = (
      <Text
        text={`${review_text.substring(0, splitIndex)} ...`}
        display={display.shortDisplay}
        setDisplay={setDisplay}
      />
    );

    longText = (
      <Text
        text={`${review_text}`}
        display={display.longDisplay}
        setDisplay={setDisplay}
      />
    );
  } else shortText = <Text text={review_text} />;

  return (
    <StyledTextWrapper>
      {shortText}
      {longText}
    </StyledTextWrapper>
  );
};

export default TextBox;
