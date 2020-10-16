import React from 'react';
import { shallow } from 'enzyme';

import App from '../../../client/components/App';
import Title from '../../../client/components/Title';
import Reviews from '../../../client/components/Reviews/Reviews';
import ReviewSummary from '../../../client/components/ReviewSummary/ReviewSummary';
import SearchReviews from '../../../client/components/SearchReviews/SearchReviews';

describe('App Component', () => {
  const matchProp = { params: { id: 1 } };
  it('should render a single node that has \'app-container\' as the classname', () => {
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.is('.app-container')).toBe(true);
  });

  it('should have 4 children in the \'app\' component', () => {
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.find('.app-container').children().length).toBe(4);
  });

  it('should contain the Reviews, ReviewSummary, SearchReviews, & Title components', () => {
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.find(Reviews)).toHaveLength(1);
    expect(wrapper.find(ReviewSummary)).toHaveLength(1);
    expect(wrapper.find(SearchReviews)).toHaveLength(1);
    expect(wrapper.find(Title)).toHaveLength(1);
  });
});
