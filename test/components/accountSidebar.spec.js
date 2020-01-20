import {render} from '@testing-library/react';
import React from 'react';

import AccountSidebar from '#root/components/accountSidebar';

describe('<AccountSidebar/>', () => {
  it('Should render without crashing', () => {
    const {container} = render(<AccountSidebar activeLink={0} />);

    expect(container).toBeDefined();
  });

  it('Should render 4 links by default', () => {
    const {container} = render(<AccountSidebar activeLink={0} />);

    const lis = container.querySelectorAll('li');

    expect(lis.length).toEqual(4);
  });
});
