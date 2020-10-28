import React from 'react';
import { shallow } from 'enzyme';

import { LinkReviewBar } from '../../../../../client/components/ReviewSummary/ReviewGraph/LinkReviewBar';
import BarFill from '../../../../../client/components/ReviewSummary/ReviewGraph/BarFill';

describe('LinkReviewBar Component', () => {
  it('should render only a BarFill component passing total_reviews & reviewCount prop to it', () => {
    const wrapper = shallow(<LinkReviewBar
      total_reviews={4}
      reviewCount={1}
    />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.find(BarFill).props().total_reviews).toBe(4);
    expect(wrapper.find(BarFill).props().reviewCount).toBe(1);
  });
});
