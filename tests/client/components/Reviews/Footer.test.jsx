import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../../client/components/Reviews/Footer';

describe('Footer Component', () => {
  it('should only render text', () => {
    const wrapper = shallow(<Footer username="Footer" />);
    expect(wrapper.children().length).toBe(1);
  });

  it('should render data in username prop', () => {
    const wrapper = shallow(<Footer username="Footer" />);
    expect(wrapper.text()).toBe('Footer');
  });
});
