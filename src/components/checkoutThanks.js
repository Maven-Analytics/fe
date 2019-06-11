import React from 'react';
import PropTypes from 'prop-types';

import MaIcon from './maIcon';
import Markdown from './markdown';

const CheckoutThanks = ({content}) => {
  return (
    <div className="checkout-thanks">
      <MaIcon icon="maven"/>
      <Markdown content={content}/>
    </div>
  );
};

CheckoutThanks.propTypes = {
  content: PropTypes.string.isRequired
};

export default CheckoutThanks;
