import React from 'react';
import { shallow } from 'enzyme';

import BarFill from '../../../../../client/components/ReviewSummary/ReviewGraph/BarFill';

describe('BarFill Component', () => {
  it('should only contain 1 child with a width prop of reviewCount/total_reviews', () => {
    const wrapper = shallow(<BarFill total_reviews={4} reviewCount={1} />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.childAt(0).props().width).toBe(0.25);
  });
});
