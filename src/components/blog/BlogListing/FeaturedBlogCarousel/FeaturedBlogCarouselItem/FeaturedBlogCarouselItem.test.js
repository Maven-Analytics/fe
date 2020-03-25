import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import FeaturedBlogCarouselItem from './FeaturedBlogCarouselItem';

it('Should match the snapshot', () => {
  const wrapper = shallow(<FeaturedBlogCarouselItem link="/test" />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
