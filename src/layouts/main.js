import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import '../styles/index.scss';

const Layout = ({children}) => (
  <div>
    <header>
      <Link href="/"><a>Home</a></Link>
      <Link href="/about"><a>About</a></Link>
    </header>
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
