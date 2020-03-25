import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import AuthorThumbnail from './AuthorThumbnail';

it('Should match the snapshot', () => {
  const wrapper = shallow(<AuthorThumbnail image={{}} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
