import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import CheckoutHeader from '../sections/checkoutHeader';
import Copyright from '../sections/copyright';

const Checkout = ({children}) => {
  return (
    <Fragment>
      <CheckoutHeader/>
      <main id="main" className="page-wrapper">
        {children}
      </main>
      <footer>
        <Copyright/>
      </footer>
    </Fragment>
  );
};

Checkout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Checkout;

