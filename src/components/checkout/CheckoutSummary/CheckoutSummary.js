import * as PropTypes from 'prop-types';
import React from 'react';

import {trialLength} from '#root/constants';
import {centsToDollarString, formatDatePretty} from '#root/utils/componentHelpers';

const CheckoutSummary = ({
  amountToday,
  hasTrial,
  interval,
  planName,
  planPrice
}) => {
  const starts = formatDatePretty(hasTrial ? new Date().getTime() + trialLength : new Date());

  return (
    <div className="checkout-summary">
      <header className="checkout-summary__header">
        <div className="checkout-summary__header-row">
          <div><p>Your Subscription</p></div>
          <div><p>Due Today</p></div>
        </div>
      </header>
      <div className="checkout-summary__body">
        <div className="checkout-summary__body-row">
          <div>
            <p>{planName}</p>
            {hasTrial ? <p><strong>FREE 7 DAY TRIAL</strong></p> : null}
          </div>
          <div className="price">{hasTrial ? '$0.00' : centsToDollarString(amountToday)}</div>
        </div>
        <div className="checkout-summary__body-row">
          <div>
            <p className="renews">Renews every {interval} at ${planPrice} starting {starts}.<br/>No obligation, cancel anytime!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutSummary.propTypes = {
  amountToday: PropTypes.number.isRequired,
  hasTrial: PropTypes.bool,
  interval: PropTypes.oneOf(['month', 'year']).isRequired,
  planName: PropTypes.string.isRequired,
  planPrice: PropTypes.number.isRequired
};

export default CheckoutSummary;
