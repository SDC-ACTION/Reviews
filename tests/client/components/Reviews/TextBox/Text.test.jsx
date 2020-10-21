import React from 'react';
import { mount } from 'enzyme';

import Text from '../../../../../client/components/Reviews/TextBox/Text';
import LinkText from '../../../../../client/components/Reviews/TextBox/LinkText';

describe('Text Component', () => {
  it('should render data in text prop with a non-breaking space', () => {
    const wrapper = mount(<Text text="text" />);
    expect(wrapper.text()).toBe(`text${String.fromCharCode(160)}`);
  });

  it('should not render LinkText component when setDisplay prop is undefined', () => {
    const wrapper = mount(<Text text="text" />);
    expect(wrapper.find(LinkText)).toHaveLength(0);
  });

  it('should render LinkText component when setDisplay prop is defined', () => {
    const wrapper = mount(<Text text="text" setDisplay="defined" />);
    expect(wrapper.find(LinkText)).toHaveLength(1);
  });
});
