import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogFeed from './BlogFeed';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogFeed />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Should render 4 <BlogCards/>', () => {
  const wrapper = shallow(<BlogFeed blogs={[{title: '1'}, {title: '2'}, {title: '3'}, {title: '4'}]} />);

  const BlogCard = require('../../shared/BlogCard').default;

  expect(wrapper.find(BlogCard).length).toEqual(4);
});

it('Should render a <Loader/> if the loading props is true', () => {
  const wrapper = shallow(<BlogFeed loading />);

  const Loader = require('maven-ui').Loader;

  expect(wrapper.find(Loader).length).toEqual(1);
});

it('Should not render a <Loader/> if the loading props is false', () => {
  const wrapper = shallow(<BlogFeed loading={false} />);

  const Loader = require('maven-ui').Loader;

  expect(wrapper.find(Loader).length).toEqual(0);
});
