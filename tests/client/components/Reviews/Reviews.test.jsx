import React from 'react';
import { shallow } from 'enzyme';

import Reviews from '../../../../client/components/Reviews/Reviews';
import Heading from '../../../../client/components/Reviews/Heading';
import Rating from '../../../../client/components/Reviews/Rating/Rating';
import TextBox from '../../../../client/components/Reviews/TextBox/TextBox';
import Footer from '../../../../client/components/Reviews/Footer';
import AllReviews from '../../../../client/components/Reviews/AllReviews';

jest.mock('../../../../client/hooks/useAPI.js');

describe('Review Component', () => {
  it('should render no components when no data is received from the api request', () => {
    const wrapper = shallow(<Reviews product_id="" />);
    expect(wrapper.children().length).toBe(0);
  });

  it('should render 5 components, Heading/Rating/TextBox/Footer/AllReviews when data is recieved from the api request', () => {
    const apiData = {
      created_at: 'created_at',
      review_heading: 'review_heading',
      review_rating: 'review_rating',
      review_text: 'review_text',
      username: 'username',
    };

    const wrapper = shallow(<Reviews product_id={JSON.stringify(apiData)} />);
    expect(wrapper.children().length).toBe(5);
    expect(wrapper.find(Heading)).toHaveLength(1);
    expect(wrapper.find(Rating)).toHaveLength(1);
    expect(wrapper.find(TextBox)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(AllReviews)).toHaveLength(1);
  });

  it('should pass the correct props to each component', () => {
    const apiData = {
      created_at: 'created_at',
      review_heading: 'review_heading',
      review_rating: 'review_rating',
      review_text: 'review_text',
      username: 'username',
    };

    const wrapper = shallow(<Reviews product_id={JSON.stringify(apiData)} />);
    expect(wrapper.find(Heading).props().review_heading).toBe('review_heading');
    expect(wrapper.find(Rating).props().review_rating).toBe('review_rating');
    expect(wrapper.find(Rating).props().created_at).toBe('created_at');
    expect(wrapper.find(TextBox).props().review_text).toBe('review_text');
    expect(wrapper.find(Footer).props().username).toBe('username');
  });
});
