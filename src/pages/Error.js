import React from 'react';

import CheckoutThanks from '#root/components/checkoutThanks';
import Checkout from '#root/components/layout/checkout';
import {Routes} from '#root/routes';

const ErrorPage = () => (
  <Checkout full fullNav>
    <CheckoutThanks
      subtitleFirst
      icon="cogs"
      linkHref={Routes.Home}
      linkText="Return To Homepage"
      style={{maxWidth: 768}}
      subtitle="Well, this is awkward..."
      title="Something isn't quite right. Please check back soon!"
    />
  </Checkout>
);

export default ErrorPage;
