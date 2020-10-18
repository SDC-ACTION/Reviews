import React from 'react';
import { shallow } from 'enzyme';

import PostDate from '../../../../../client/components/Reviews/Rating/PostDate';

describe('PostDate Component', () => {
  it('should only contain text', () => {
    const wrapper = shallow(<PostDate created_at="2020-08-05T09:34:32.000Z" />);
    expect(wrapper.children().length).toBe(1);
  });

  it('should render converted ISODate string to Month Day, Year format', () => {
    const wrapper = shallow(<PostDate created_at="2020-08-05T09:34:32.000Z" />);
    expect(wrapper.text()).toBe('August 5, 2020');
  });
});
