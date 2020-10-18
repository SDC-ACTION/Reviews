import React from 'react';
import { shallow } from 'enzyme';

import Heading from '../../../../client/components/Reviews/Heading';

describe('Heading Component', () => {
  it('should only render text', () => {
    const wrapper = shallow(<Heading review_heading="Heading" />);
    expect(wrapper.children().length).toBe(1);
  });

  it('should render data in review_heading prop', () => {
    const wrapper = shallow(<Heading review_heading="Heading" />);
    expect(wrapper.text()).toBe('Heading');
  });
});
