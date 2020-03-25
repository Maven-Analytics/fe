import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import FeedGrid from './FeedGrid';

it('Should match the snapshot', () => {
  const wrapper = shallow(<FeedGrid content="This is the content" />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Should return null if the posts are empty', () => {
  const wrapper = shallow(<FeedGrid posts={[]} />);

  expect(wrapper.getElement()).toBeNull();
});

it('Should return null if the posts are null', () => {
  const wrapper = shallow(<FeedGrid posts={[]} />);

  expect(wrapper.getElement()).toBeNull();
});
