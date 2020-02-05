import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import AccountListHeader from './';

describe('<AccountListHeader/>', () => {
  it('Should match the snapshot', () => {
    const wrapper = shallow(
      <AccountListHeader
        columns={[{label: 'col 1'}]}
        columnClasses={['class-1']}
      />
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should render the correct col classes', () => {
    const wrapper = shallow(
      <AccountListHeader
        columns={[{label: 'Column 1'}, {label: 'Column 2'}]}
        columnClasses={['col-1', 'col-2']}
      />
    );

    expect(wrapper.find('.col-1').length).toBe(1);
    expect(wrapper.find('.col-2').length).toBe(1);

    expect(wrapper.find('.row').childAt(0).hasClass('col-1'));
    expect(wrapper.find('.row').childAt(1).hasClass('col-2'));
  });
});
