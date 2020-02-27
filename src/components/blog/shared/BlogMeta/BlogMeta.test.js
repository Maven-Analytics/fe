import {mount, shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogMeta from './BlogMeta';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogMeta />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Should render 1 span and 1 h2', () => {
  const wrapper = mount(<BlogMeta eyelash="test" title="Test Title" />);

  expect(wrapper.find('span').length).toEqual(1);
  expect(wrapper.find('h2').length).toEqual(1);
});

it('Should render a className if passed in', () => {
  const wrapper = shallow(<BlogMeta className="test" />);

  expect(wrapper.hasClass('test')).toBeTruthy();
});
