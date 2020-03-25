import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogHero from './BlogHero';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogHero link="/test" />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
