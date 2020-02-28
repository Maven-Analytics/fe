import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogCta from './BlogCta';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogCta />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
