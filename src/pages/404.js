import React from 'react';
import styled from 'styled-components';

import CheckoutThanks from '#root/components/checkoutThanks';
import Checkout from '#root/components/layout/checkout';
import {Routes} from '#root/routes';
import {mediaBreakpointUp} from '#root/utils/responsive';

const NotFoundPageMessage = styled(CheckoutThanks)`
  > p:last-of-type {
    margin-top: 2.4rem;
  }
  ${mediaBreakpointUp('lg')} {
    margin: 10rem auto;
  }
`;

const NotFoundPage = () => (
  <Checkout full fullNav>
    <NotFoundPageMessage
      subtitleFirst
      icon="cogs"
      linkHref={Routes.Home}
      linkText="Return To Homepage"
      style={{maxWidth: 768}}
      subtitle="Well, this is awkward..."
      title="The page you were looking for was not found."
    />
  </Checkout>
);

export default NotFoundPage;
