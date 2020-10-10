import React from 'react';
import { shallow } from 'enzyme';

import App from '../../../client/components/App';
import Reviews from '../../../client/components/Reviews/Reviews';
import ReviewSummary from '../../../client/components/ReviewSummary/ReviewSummary';
import SearchReviews from '../../../client/components/SearchReviews/SearchReviews';

describe('App Component', () => {
  it('should render a single node that has \'app\' as the classname', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.is('.app-container')).toBe(true);
  });

  it('should have 3 children in the \'app\' div', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.app-container').children().length).toBe(3);
  });

  it('should render the Reviews, ReviewSummary, & SearchReviews components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Reviews />)).toBe(true);
    expect(wrapper.contains(<ReviewSummary />)).toBe(true);
    expect(wrapper.contains(<SearchReviews />)).toBe(true);
  });
});
