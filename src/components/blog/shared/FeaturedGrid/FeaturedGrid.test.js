import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import FeaturedGrid from './FeaturedGrid';

it('Should match the snapshot', () => {
  const wrapper = shallow(
    <FeaturedGrid>
      <div>right</div>
    </FeaturedGrid>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});
