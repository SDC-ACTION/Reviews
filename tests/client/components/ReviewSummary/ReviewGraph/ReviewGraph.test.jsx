import React from 'react';
import { shallow } from 'enzyme';

import ReviewGraph from '../../../../../client/components/ReviewSummary/ReviewGraph/ReviewGraph';
import GraphLink from '../../../../../client/components/ReviewSummary/ReviewGraph/GraphLink';

jest.mock('../../../../../client/components/ReviewSummary/ReviewGraph/GraphLink');

describe('ReviewGraph Component', () => {
  it('should only render 5 GraphLink components', () => {
    const reviewSummary = [
      {
        rating_5: 1,
        rating_4: 1,
        rating_3: 1,
        rating_2: 1,
        rating_1: 1,
        total_reviews: 5,
      },
    ];
    const wrapper = shallow(<ReviewGraph reviewSummary={reviewSummary} />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.childAt(0).children()).toHaveLength(5);
    expect(wrapper.find(GraphLink)).toHaveLength(5);
  });

  it('should set star prop of GraphLink components from 5 to 1 in this order', () => {
    const reviewSummary = [
      {
        rating_5: 6,
        rating_4: 6,
        rating_3: 6,
        rating_2: 6,
        rating_1: 6,
        total_reviews: 5,
      },
    ];
    const wrapper = shallow(<ReviewGraph reviewSummary={reviewSummary} />);
    expect(wrapper.find(GraphLink).at(0).props().star).toBe(5);
    expect(wrapper.find(GraphLink).at(1).props().star).toBe(4);
    expect(wrapper.find(GraphLink).at(2).props().star).toBe(3);
    expect(wrapper.find(GraphLink).at(3).props().star).toBe(2);
    expect(wrapper.find(GraphLink).at(4).props().star).toBe(1);
  });

  it('should pass count prop to GraphLink component in the order from rating 5 to rating 1', () => {
    const reviewSummary = [
      {
        rating_5: 5,
        rating_4: 4,
        rating_3: 3,
        rating_2: 2,
        rating_1: 1,
        total_reviews: 5,
      },
    ];
    const wrapper = shallow(<ReviewGraph reviewSummary={reviewSummary} />);
    expect(wrapper.find(GraphLink).at(0).props().count).toBe(5);
    expect(wrapper.find(GraphLink).at(1).props().count).toBe(4);
    expect(wrapper.find(GraphLink).at(2).props().count).toBe(3);
    expect(wrapper.find(GraphLink).at(3).props().count).toBe(2);
    expect(wrapper.find(GraphLink).at(4).props().count).toBe(1);
  });

  it('should pass total_reviews to all GraphLink components in the \'total\' prop', () => {
    const reviewSummary = [
      {
        rating_5: 5,
        rating_4: 4,
        rating_3: 3,
        rating_2: 2,
        rating_1: 1,
        total_reviews: 66,
      },
    ];
    const wrapper = shallow(<ReviewGraph reviewSummary={reviewSummary} />);
    expect(wrapper.find(GraphLink).at(0).props().total).toBe(66);
    expect(wrapper.find(GraphLink).at(1).props().total).toBe(66);
    expect(wrapper.find(GraphLink).at(2).props().total).toBe(66);
    expect(wrapper.find(GraphLink).at(3).props().total).toBe(66);
    expect(wrapper.find(GraphLink).at(4).props().total).toBe(66);
  });
});
