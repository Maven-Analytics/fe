import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import MaIcon from './maIcon';
import {Routes} from '../routes';

const CheckoutThanks = () => {
  return (
    <div className="checkout-thanks">
      <MaIcon icon="maven" />
      <h1>Welcome to Maven Analytics</h1>
      <h2>{'Now Let\'s Get Started!'}</h2>
      <p>Head to your student dashboard to get started.</p>
      <p>
        <Link href={Routes.Dashboard}>
          <a>Take Me To My Dashboard</a>
        </Link>
      </p>
    </div>
  );
};

export default CheckoutThanks;
