import React from 'react';
import renderer from 'react-test-renderer';

import AccountSidebar from '../../src/components/accountSidebar';

describe('<AccountSidebar/>', () => {
  it('Should render without crashing', () => {
    const renderedComp = renderer.create(<AccountSidebar activeLink={0} />);

    let tree = renderedComp.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should log a warning to the console if activeLink prop is not passed in', () => {
    console.error = jest.fn();

    renderer.create(<AccountSidebar />);

    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
