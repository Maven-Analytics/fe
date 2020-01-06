import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import HeaderAuth from '#root/components/headerAuth';
import Logo from '#root/components/logo';
import {Routes} from '#root/routes';

const CheckoutHeader = ({loginRedirect}) => {
  return (
    <header className="global-header global-header--checkout">
      <div className="container container--lg">
        <div className="global-header__inner">
          <Link href={Routes.Home}>
            <a className="global-header__brand">
              <Logo />
            </a>
          </Link>
          <nav>
            <ul>
            </ul>
            <HeaderAuth loginRedirect={loginRedirect} />
          </nav>
        </div>
      </div>
    </header>
  );
};

CheckoutHeader.propTypes = {
  loginRedirect: PropTypes.string
};

export default CheckoutHeader;
