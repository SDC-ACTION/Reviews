import React from 'react';
import { shallow, mount } from 'enzyme';
import longString from './longString';
import TextBox from '../../../../../client/components/Reviews/TextBox/TextBox';
import Text from '../../../../../client/components/Reviews/TextBox/Text';
import LinkText from '../../../../../client/components/Reviews/TextBox/LinkText';

jest.mock('../../../../../client/components/Reviews/TextBox/LinkText');

describe('TextBox Component', () => {
  it('should render 1 Text component when the review_text prop is less than 800 characters', () => {
    const wrapper = shallow(<TextBox review_text="short" />);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.find(Text)).toHaveLength(1);
  });

  it('should render 2 Text component when the review_text prop is greater than 800 characters', () => {
    const wrapper = shallow(<TextBox review_text={longString} />);
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.find(Text)).toHaveLength(2);
  });

  it('should render text prop with 3 props, text/display/setDisplay, when review_text is greater than 800 characters', () => {
    const wrapper = shallow(<TextBox review_text={longString} />);
    expect(wrapper.find(Text).at(0).props().text).toBeDefined();
    expect(wrapper.find(Text).at(0).props().display).toBeDefined();
    expect(wrapper.find(Text).at(0).props().setDisplay).toBeDefined();
  });

  it('should render text prop with 1 prop, text, when review_text is less than 800 characters', () => {
    const wrapper = shallow(<TextBox review_text="short" />);
    expect(wrapper.find(Text).at(0).props().text).toBeDefined();
    expect(wrapper.find(Text).at(0).props().display).toBeUndefined();
    expect(wrapper.find(Text).at(0).props().setDisplay).toBeUndefined();
  });

  it('should set the longText display prop from none to null & the shortText display prop from null to none when clicking on the \'More\' link', () => {
    const wrapper = mount(<TextBox review_text={longString} />);
    wrapper.find(Text).at(0).find(LinkText).simulate('click');

    const shortText = wrapper.find(Text).at(0);
    expect(shortText.props().display).toBe('none');

    const longText = wrapper.find(Text).at(1);
    expect(longText.props().display).toBe(null);
  });

  it('should set the longText display prop from null to none & the shortText display prop from none to null when clicking on the \'Less\' link', () => {
    const wrapper = mount(<TextBox review_text={longString} />);
    wrapper.find(Text).at(0).find(LinkText).simulate('click');
    wrapper.find(Text).at(1).find(LinkText).simulate('click');

    const shortText = wrapper.find(Text).at(0);
    expect(shortText.props().display).toBe(null);

    const longText = wrapper.find(Text).at(1);
    expect(longText.props().display).toBe('none');
  });
});
