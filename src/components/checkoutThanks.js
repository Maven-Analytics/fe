import Link from 'next/link';
import * as PropTypes from 'prop-types';
import React from 'react';

import {Routes} from '../routes';
import MaIcon from './maIcon';

const CheckoutThanks = ({icon, linkHref, linkText, style, subtitle, subtitleFirst, title}) => {
  return (
    <div className="checkout-thanks" style={style}>
      <MaIcon icon={icon} />
      {subtitleFirst ? (
        <>
         <h2>{subtitle}</h2>
         <h1>{title}</h1>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </>
      )}
      <p>
        <Link href={linkHref}>
          <a>{linkText}</a>
        </Link>
      </p>
    </div>
  );
};

CheckoutThanks.propTypes = {
  icon: PropTypes.string,
  linkHref: PropTypes.string,
  linkText: PropTypes.string,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  subtitleFirst: PropTypes.bool,
  title: PropTypes.string
};

CheckoutThanks.defaultProps = {
  icon: 'maven',
  linkHref: Routes.Dashboard,
  linkText: 'Take Me To My Dashboard',
  subtitle: 'Now Let\'s Get Started!',
  title: 'Welcome to Maven Analytics'
};

export default CheckoutThanks;
