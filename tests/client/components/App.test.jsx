import React from 'react';
import { shallow } from 'enzyme';

import App from '../../../client/components/App';
import Title from '../../../client/components/Title';
import Reviews from '../../../client/components/Reviews/Reviews';
import AverageRating from '../../../client/components/ReviewSummary/AverageRating';
import ReviewGraph from '../../../client/components/ReviewSummary/ReviewGraph/ReviewGraph';
import SearchReviews from '../../../client/components/SearchReviews/SearchReviews';

jest.mock('../../../client/hooks/useAPI');

describe('App Component', () => {
  it('should be empty when reviewSummary is null', () => {
    const matchProp = { params: { id: '' } };
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.children().length).toBe(0);
  });

  it('should have 5 children in the App component', () => {
    const matchProp = { params: { id: 1 } };
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.children().length).toBe(5);
  });

  it('should contain the Reviews, AverageRating, ReviewGraph, SearchReviews, & Title components', () => {
    const matchProp = { params: { id: 1 } };
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.find(Reviews)).toHaveLength(1);
    expect(wrapper.find(AverageRating)).toHaveLength(1);
    expect(wrapper.find(ReviewGraph)).toHaveLength(1);
    expect(wrapper.find(SearchReviews)).toHaveLength(1);
    expect(wrapper.find(Title)).toHaveLength(1);
  });

  it('should pass reviewSummary data to AverageRating component', () => {
    const reviewSummary = {
      total_reviews: 10,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 6,
    };
    const matchProp = { params: { id: JSON.stringify(reviewSummary) } };
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.find(AverageRating).props().reviewSummary).toMatchObject([reviewSummary]);
  });

  it('should pass reviewSummary data to ReviewGraph component', () => {
    const reviewSummary = {
      total_reviews: 10,
      rating_1: 1,
      rating_2: 1,
      rating_3: 1,
      rating_4: 1,
      rating_5: 6,
    };
    const matchProp = { params: { id: JSON.stringify(reviewSummary) } };
    const wrapper = shallow(<App match={matchProp} />);
    expect(wrapper.find(ReviewGraph).props().reviewSummary).toMatchObject([reviewSummary]);
  });
});
