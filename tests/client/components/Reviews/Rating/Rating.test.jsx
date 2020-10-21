import React from 'react';
import { shallow } from 'enzyme';

import Rating from '../../../../../client/components/Reviews/Rating/Rating';
import Stars from '../../../../../client/components/Reviews/Rating/Stars';
import PostDate from '../../../../../client/components/Reviews/Rating/PostDate';

describe('Stars Component', () => {
  it('should only render 2 components, Stars and PostDate', () => {
    const wrapper = shallow(<Rating review_rating={2} created_at="999" />);
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.find(Stars)).toHaveLength(1);
    expect(wrapper.find(PostDate)).toHaveLength(1);
  });

  it('should pass props to correct components', () => {
    const wrapper = shallow(<Rating review_rating={2} created_at="999" />);
    expect(wrapper.find(Stars).props().review_rating).toBe(2);
    expect(wrapper.find(PostDate).props().created_at).toBe('999');
  });
});
