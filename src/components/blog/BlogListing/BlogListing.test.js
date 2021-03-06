import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogListing from './BlogListing';

jest.mock('@apollo/react-hooks', () => {
  return {
    useQuery: () => ({})
  };
});

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogListing />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
