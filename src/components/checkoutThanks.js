import Link from 'next/link';
import * as PropTypes from 'prop-types';
import React from 'react';

import {Routes} from '../routes';
import MaIcon from './maIcon';

const CheckoutThanks = ({linkHref, linkText, subtitle, title}) => {
  return (
    <div className="checkout-thanks">
      <MaIcon icon="maven" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>
        <Link href={linkHref}>
          <a>{linkText}</a>
        </Link>
      </p>
    </div>
  );
};

CheckoutThanks.propTypes = {
  linkHref: PropTypes.string,
  linkText: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

CheckoutThanks.defaultProps = {
  linkHref: Routes.Dashboard,
  linkText: 'Take Me To My Dashboard',
  subtitle: 'Now Let\'s Get Started!',
  title: 'Welcome to Maven Analytics'
};

export default CheckoutThanks;
