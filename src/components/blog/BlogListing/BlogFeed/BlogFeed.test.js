import {mount, shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogFeed from './BlogFeed';

const posts = [{title: '1'}, {title: '2'}, {title: '3'}, {title: '4'}, {title: '5'}, {title: '6'}];

const otherPosts = [{title: '7'}, {title: '8'}, {title: '9'}];

jest.mock('../../shared/BlogSubscribe', () => {
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>subscribe</div>
  };
});

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogFeed />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Should render only one FeedGrid with the first 6 posts', () => {
  const wrapper = mount(<BlogFeed loading={false} blogs={posts} />);

  const FeedGrid = require('./FeedGrid').default;

  expect(wrapper.find(FeedGrid).length).toEqual(1);
});

it('Should render 2 FeedGrids with more than 6 posts', () => {
  const wrapper = mount(<BlogFeed loading={false} blogs={[...posts, ...otherPosts]} />);

  const FeedGrid = require('./FeedGrid').default;

  expect(wrapper.find(FeedGrid).length).toEqual(2);
});

it('Should render a container around the FeedGrid', () => {
  const wrapper = shallow(<BlogFeed loading={false} blogs={[...posts, ...otherPosts]} />);

  const FeedGrid = require('./FeedGrid').default;

  expect(wrapper.childAt(0).hasClass('container')).toBeTruthy();

  expect(
    wrapper
      .childAt(0)
      .childAt(0)
      .dive()
      .type()
  ).toEqual(FeedGrid);
});

it('Should render a BlogCta in between grids', () => {
  const wrapper = shallow(<BlogFeed loading={false} blogs={[...posts, ...otherPosts]} />);

  const BlogCta = require('../../shared/BlogCta').default;
  const FeedGrid = require('./FeedGrid').default;

  expect(
    wrapper
      .childAt(0)
      .childAt(0)
      .dive()
      .type()
  ).toEqual(FeedGrid);
  expect(
    wrapper
      .childAt(1)
      .dive()
      .type()
  ).toEqual(BlogCta);
  expect(
    wrapper
      .childAt(2)
      .childAt(0)
      .dive()
      .type()
  ).toEqual(FeedGrid);
});

it('Should render a BlogSubscribe as the last child', () => {
  const wrapper = shallow(<BlogFeed loading={false} blogs={[...posts, ...otherPosts]} />);

  const BlogSubscribe = require('../../shared/BlogSubscribe').default;

  expect(
    wrapper
      .children()
      .last()
      .dive()
      .type()
  ).toEqual(BlogSubscribe);
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
