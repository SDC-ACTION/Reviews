import React, { useState } from 'react';
import styled from 'styled-components';
import ShortText from './ShortText';
import LongText from './LongText';

const StyledTextWrapper = styled.div`
  margin: 0px;
`;

const Text = ({ review_text }) => {
  const [enableDisplay, setEnableDisplay] = useState(null);

  let shortText = null;
  let longText = null;

  if (review_text.length > 800) {
    const splitIndex = review_text.lastIndexOf(' ', 800);

    shortText = (
      <ShortText
        text={review_text.substring(splitIndex)}
        display={(enableDisplay === null) ? enableDisplay : 'none'}
        setEnableDisplay={setEnableDisplay}
      />
    );

    longText = (
      <LongText
        text={review_text}
        display={(enableDisplay === null) ? 'none' : enableDisplay}
        setEnableDisplay={setEnableDisplay}
      />
    );
  } else shortText = <ShortText text={review_text} />;

  return (
    <StyledTextWrapper>
      {shortText}
      {longText}
    </StyledTextWrapper>
  );
};

export default Text;
