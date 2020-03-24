import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogDetail from './BlogDetail';

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogDetail author={{biography: 'Author bio'}} blog={{body: ''}} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
