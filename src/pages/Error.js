import React from 'react';

import CheckoutThanks from '#root/components/checkoutThanks';
import Checkout from '#root/components/layout/checkout';

const ErrorPage = () => (
  <Checkout full fullNav>
    <CheckoutThanks />
  </Checkout>
);

export default ErrorPage;
