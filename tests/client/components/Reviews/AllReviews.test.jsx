import React from 'react';
import { shallow } from 'enzyme';

import AllReviews from '../../../../client/components/Reviews/AllReviews';

describe('AllReviews Component', () => {
  it('should only render the text \'All Reviews\'', () => {
    const wrapper = shallow(<AllReviews />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.text()).toBe('All Reviews');
  });
});
