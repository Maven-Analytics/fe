import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import Blog from './Blog';

it('Should match the snapshot', () => {
  const wrapper = shallow(<Blog />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Should render children', () => {
  const wrapper = shallow(
    <Blog>
      <h1>blog</h1>
    </Blog>
  );

  expect(wrapper.find('h1').text()).toEqual('blog');
});
