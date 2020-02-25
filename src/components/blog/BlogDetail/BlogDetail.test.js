import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogDetail from './BlogDetail';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogDetail />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Should render 1 <FeaturedBlog/>', () => {
  const wrapper = shallow(<BlogDetail />);

  const FeaturedBlog = require('../shared/FeaturedBlog').default;

  expect(wrapper.find(FeaturedBlog).length).toEqual(1);
});
