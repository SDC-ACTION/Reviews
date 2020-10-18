import React from 'react';
import { shallow } from 'enzyme';

import LinkText from '../../../../../client/components/Reviews/TextBox/LinkText';

jest.mock('../../../../../client/components/Reviews/TextBox/LinkText');

describe('LinkText Component', () => {
  it('should only render text', () => {
    const wrapper = shallow(<LinkText pressLink={() => { }} linkText="Text" />);
    expect(wrapper.children().length).toBe(1);
  });

  it('should render data in linkText prop', () => {
    const wrapper = shallow(<LinkText pressLink={() => { }} linkText="Text" />);
    expect(wrapper.text()).toBe('Text');
  });

  it('should have a borderStyle state of hidden on render', () => {
    const wrapper = shallow(<LinkText pressLink={() => { }} linkText="Less" />);
    expect(wrapper.props().borderStyle).toBe('hidden');
  });

  it('should change borderStyle state to solid on mouse down', () => {
    const wrapper = shallow(<LinkText pressLink={() => { }} linkText="Less" />);
    wrapper.invoke('onMouseDown')();
    expect(wrapper.props().borderStyle).toBe('solid');
  });

  it('should change borderStyle state back to hidden on mouse up', () => {
    const wrapper = shallow(<LinkText pressLink={() => { }} linkText="Less" />);
    wrapper.invoke('onMouseDown')();
    expect(wrapper.props().borderStyle).toBe('solid');
    wrapper.invoke('onMouseUp')();
    expect(wrapper.props().borderStyle).toBe('hidden');
  });
});
