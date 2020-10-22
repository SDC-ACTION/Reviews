import React from 'react';
import { shallow } from 'enzyme';

import LinkStarText from '../../../../../client/components/ReviewSummary/ReviewGraph/LinkStarText';

describe('LinkStarText Component', () => {
  it('should only render text with the star number that was passed in', () => {
    const wrapper = shallow(<LinkStarText star={1} />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.text()).toBe('1 star');
  });
});
