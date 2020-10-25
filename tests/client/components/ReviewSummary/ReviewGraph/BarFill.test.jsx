import React from 'react';
import { shallow } from 'enzyme';

import BarFill from '../../../../../client/components/ReviewSummary/ReviewGraph/BarFill';

describe('BarFill Component', () => {
  it('should only contain 1 child with a style prop that\'s an object with a width key and value of reviewCount/total_reviews * 342px', () => {
    const style = { width: '85.5px' };

    const wrapper = shallow(<BarFill total_reviews={4} reviewCount={1} />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.childAt(0).props().style).toMatchObject(style);
  });
});
