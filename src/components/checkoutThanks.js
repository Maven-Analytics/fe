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
      <p>Take a quick 2-minute survey, and we’ll match you to the best courses & paths to help you reach your goals.</p>
      <p>
        <Link href={Routes.WelcomeSurvey}>
          <a>Start Survey</a>
        </Link>
      </p>
    </div>
  );
};

CheckoutThanks.propTypes = {
  content: PropTypes.string.isRequired
};

export default CheckoutThanks;
