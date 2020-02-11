import * as PropTypes from 'prop-types';
import React from 'react';

import {trialLength} from '#root/constants';
import {centsToDollarString, formatDatePretty} from '#root/utils/componentHelpers';

const CheckoutSummary = ({
  amountToday,
  coupon,
  hasTrial,
  interval,
  planName,
  planPrice
}) => {
  const starts = formatDatePretty(hasTrial ? new Date().getTime() + trialLength : new Date());

  let amountOff = 0;

  if (coupon && coupon.percent_off) {
    amountOff = amountToday * coupon.percent_off / 100;
  }

  if (coupon && coupon.amount_off) {
    amountOff = coupon.amount_off;
  }

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
        {coupon ? (
          <>
            <div className="checkout-summary__body-row">
              <div>
                <p>{coupon.name}<br/>
                Coupon: <strong>{coupon.id}</strong></p>
              </div>
              <div className="price">
                {`- ${centsToDollarString(amountToday * coupon.percent_off / 100)}`}
              </div>
            </div>
            <div className="checkout-summary__body-row total">
              <div className="price">
                <p>Total</p>
              </div>
              <div className="price">
                <p>{centsToDollarString(amountToday - amountOff)}</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

CheckoutSummary.propTypes = {
  amountToday: PropTypes.number.isRequired,
  coupon: PropTypes.shape({
    amount_off: PropTypes.number,
    duration: PropTypes.string,
    duration_in_months: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    percent_off: PropTypes.number
  }),
  hasTrial: PropTypes.bool,
  interval: PropTypes.oneOf(['month', 'year']).isRequired,
  planName: PropTypes.string.isRequired,
  planPrice: PropTypes.number.isRequired
};

export default CheckoutSummary;
