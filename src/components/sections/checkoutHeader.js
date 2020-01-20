import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Hamburger from '#root/components/hamburger';
import HeaderAuth from '#root/components/headerAuth';
import Logo from '#root/components/logo';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';

const CheckoutHeader = ({loginRedirect}) => {
  const dispatch = useDispatch();
  const state = useSelector(stateSelectors.getState);

  return (
    <header className="global-header global-header--checkout">
      <div className="container container--lg">
        <div className="global-header__inner">
          <Link href={Routes.Home}>
            <a className="global-header__brand">
              <Logo />
            </a>
          </Link>
          <Hamburger isActive={state.get('mobileMenu')} onClick={() => dispatch(stateActions.offmenuToggle('mobileMenu'))} />
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
