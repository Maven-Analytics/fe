import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogBanner from './BlogBanner';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogBanner />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
