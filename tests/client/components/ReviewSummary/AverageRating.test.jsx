import React from 'react';
import { shallow } from 'enzyme';

import AverageRating from '../../../../client/components/ReviewSummary/AverageRating';
import Stars from '../../../../client/components/Reviews/Rating/Stars';

describe('AverageRating Component', () => {
  it('should only render text at child 0 & 2 & a stars component in between', () => {
    const reviewSummary = [{
      total_reviews: 1,
      rating_1: 1,
      rating_2: 0,
      rating_3: 0,
      rating_4: 0,
      rating_5: 0,
    }];
    const wrapper = shallow(<AverageRating reviewSummary={reviewSummary} />).childAt(0);
    expect(wrapper.children().length).toBe(3);
    expect(wrapper.childAt(0).text()).toBe('1.0');
    expect(wrapper.find(Stars)).toHaveLength(1);
    expect(wrapper.childAt(2).text()).toBe('1 review');
  });

  it('should render the average rating of reviews rounded up for a product', () => {
    const reviewSummary = [{
      total_reviews: 11,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 7,
    }];

    const wrapper = shallow(<AverageRating reviewSummary={reviewSummary} />).childAt(0);
    expect(wrapper.childAt(0).text()).toBe('4.1');
  });

  it('should render singular & plural word for review', () => {
    const singular = [{
      total_reviews: 1,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1,
    }];

    const plural = [{
      total_reviews: 2,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1,
    }];

    const wrapperSingular = shallow(<AverageRating reviewSummary={singular} />).childAt(0);
    expect(wrapperSingular.childAt(2).text()).toBe('1 review');

    const wrapperPlural = shallow(<AverageRating reviewSummary={plural} />).childAt(0);
    expect(wrapperPlural.childAt(2).text()).toBe('2 reviews');
  });

  it('should add a comma to the total reviews when it\'s over 999', () => {
    const reviewSummary = [{
      total_reviews: 1000,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 1,
    }];

    const wrapper = shallow(<AverageRating reviewSummary={reviewSummary} />).childAt(0);
    expect(wrapper.childAt(2).text()).toBe('1,000 reviews');
  });
});
