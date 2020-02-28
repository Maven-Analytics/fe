import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import BlogSubscribe from './BlogSubscribe';

jest.mock('#root/components/subscribe', () => {
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>subscribe</div>
  };
});

it('Should match the snapshot', () => {
  const wrapper = shallow(<BlogSubscribe />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
