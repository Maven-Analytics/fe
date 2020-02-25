import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogCard from './BlogCard';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogCard />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
