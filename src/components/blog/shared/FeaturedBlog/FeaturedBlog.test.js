import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import FeaturedBlog from './FeaturedBlog';

it('Should match the snapshot', () => {
  const wrapper = shallow(<FeaturedBlog link="/test" />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
