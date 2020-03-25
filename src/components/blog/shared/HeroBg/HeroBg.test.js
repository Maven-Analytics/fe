import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import HeroBg from './HeroBg';

it('Should match the snapshot', () => {
  const wrapper = shallow(<HeroBg />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
