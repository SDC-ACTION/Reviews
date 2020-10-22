import React from 'react';
import { shallow } from 'enzyme';

import LinkReviewCount from '../../../../../client/components/ReviewSummary/ReviewGraph/LinkReviewCount';

describe('LinkReviewCount Component', () => {
  it('should render only text with the review count', () => {
    const wrapper = shallow(<LinkReviewCount reviewCount={3} display="solid" />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.text()).toBe('3 reviews');
  });

  it('should render plural & singlar form of the word \'review\'', () => {
    let wrapper = shallow(<LinkReviewCount reviewCount={1} display="solid" />);
    expect(wrapper.text()).toBe('1 review');
    wrapper = shallow(<LinkReviewCount reviewCount={2} display="solid" />);
    expect(wrapper.text()).toBe('2 reviews');
  });

  it('should render a comma in the number when the reviewCount reaches over 999', () => {
    const wrapper = shallow(<LinkReviewCount reviewCount={1000} display="solid" />);
    expect(wrapper.text()).toBe('1,000 reviews');
  });

  it('should set display prop of component to the display prop that was passed in as a prop', () => {
    const wrapper = shallow(<LinkReviewCount reviewCount={1} display="abc" />);
    expect(wrapper.props().display).toBe('abc');
  });
});
