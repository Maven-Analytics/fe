import React from 'react';
import Link from 'next/link';

import Logo from '../components/logo';
import HeaderAuth from '../components/headerAuth';

const CheckoutHeader = () => {
  return (
    <header className="global-header global-header--checkout">
      <div className="container">
        <div className="global-header__inner">
          <Link href="/">
            <a className="global-header__brand">
              <Logo/>
            </a>
          </Link>
          <nav>
            <ul>
            </ul>
            <HeaderAuth/>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
