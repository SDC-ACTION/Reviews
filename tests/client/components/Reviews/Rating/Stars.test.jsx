import React from 'react';
import { shallow } from 'enzyme';

import Stars from '../../../../../client/components/Reviews/Rating/Stars';
import starFill from '../../../../../client/images/star-fill';
import starBlank from '../../../../../client/images/star-blank';

describe('Stars Component', () => {
  describe('should only render...', () => {
    it('2 divs', () => {
      const wrapper = shallow(<Stars review_rating={2} />);
      expect(wrapper.children().length).toBe(2);
    });

    it('first div with a style prop with the value of { width: 60px }', () => {
      const wrapper = shallow(<Stars review_rating={2} />);
      expect(wrapper.childAt(0).props().style).toMatchObject({ width: '60px' });
    });

    it('first div with a starImg prop with the value of the star-blank base64 converted svg', () => {
      const wrapper = shallow(<Stars review_rating={2} />);
      expect(wrapper.childAt(0).props().starImg).toBe(starBlank);
    });

    it('second div with a style prop with the value of { width: review_rating * 12 }', () => {
      const wrapper = shallow(<Stars review_rating={2} />);
      expect(wrapper.childAt(1).props().style).toMatchObject({ width: '24px' });
    });

    it('second div with a starImg prop with the value of the star-fill base64 converted svg', () => {
      const wrapper = shallow(<Stars review_rating={2} />);
      expect(wrapper.childAt(1).props().starImg).toBe(starFill);
    });
  });
});
