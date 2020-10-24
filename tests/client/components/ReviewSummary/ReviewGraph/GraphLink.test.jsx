import React from 'react';
import { shallow } from 'enzyme';

import GraphLink from '../../../../../client/components/ReviewSummary/ReviewGraph/GraphLink';
import LinkStarText from '../../../../../client/components/ReviewSummary/ReviewGraph/LinkStarText';
import LinkReviewBar from '../../../../../client/components/ReviewSummary/ReviewGraph/LinkReviewBar';
import LinkReviewCount from '../../../../../client/components/ReviewSummary/ReviewGraph/LinkReviewCount';

jest.mock('../../../../../client/components/ReviewSummary/ReviewGraph/GraphLink');

describe('GraphLink Component', () => {
  it('should only render 3 components. LinkStarText, LinkReviewBar, & LinkReviewCount', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={1}
      total={4}
      opacity={1}
    />);
    expect(wrapper.children().length).toBe(3);
    expect(wrapper.find(LinkStarText).length).toBe(1);
    expect(wrapper.find(LinkReviewBar).length).toBe(1);
    expect(wrapper.find(LinkReviewCount).length).toBe(1);
  });

  it('should pass props to the correct component props', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={2}
      total={4}
      opacity={1}
    />);
    expect(wrapper.find(LinkStarText).props().star).toBe(1);
    expect(wrapper.find(LinkReviewBar).props().reviewCount).toBe(2);
    expect(wrapper.find(LinkReviewBar).props().total_reviews).toBe(4);
    expect(wrapper.find(LinkReviewBar).props().opacity).toBe(1);
    expect(wrapper.find(LinkReviewCount).props().reviewCount).toBe(2);
  });

  it('should set borderStyle prop of component to transparent by default', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={2}
      total={4}
      opacity={1}
    />);
    expect(wrapper.props().borderStyle).toBe('transparent');
  });

  it('should set borderStyle prop to solid on mouse down and back to transparent on mouse up', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={2}
      total={4}
      opacity={1}
    />);
    wrapper.invoke('onMouseDown')();
    expect(wrapper.props().borderStyle).toBe('solid');
    wrapper.invoke('onMouseUp')();
    expect(wrapper.props().borderStyle).toBe('transparent');
  });

  it('should set LinkReviewCount component\'s display prop to hidden by default', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={2}
      total={4}
      opacity={1}
    />);
    expect(wrapper.find(LinkReviewCount).props().display).toBe('hidden');
  });

  it('should set LinkReviewCount component\'s display prop to null on mouse enter and back to hidden on mouse leave', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={2}
      total={4}
      opacity={1}
    />);
    wrapper.invoke('onMouseEnter')();
    expect(wrapper.find(LinkReviewCount).props().display).toBe(null);
    wrapper.invoke('onMouseLeave')();
    expect(wrapper.find(LinkReviewCount).props().display).toBe('hidden');
  });

  it('should set LinkReviewBar component\'s hoverCheck prop to false by default', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={2}
      total={4}
      opacity={1}
    />);
    expect(wrapper.find(LinkReviewBar).props().hoverCheck).toBe(false);
  });

  it('should set LinkReviewBar component\'s hoverCheck prop to true on mouse enter and back to false on mouse leave', () => {
    const wrapper = shallow(<GraphLink
      star={1}
      count={2}
      total={4}
      opacity={1}
    />);
    wrapper.invoke('onMouseEnter')();
    expect(wrapper.find(LinkReviewBar).props().hoverCheck).toBe(true);
    wrapper.invoke('onMouseLeave')();
    expect(wrapper.find(LinkReviewBar).props().hoverCheck).toBe(false);
  });
});
