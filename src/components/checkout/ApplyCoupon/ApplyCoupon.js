import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as PropTypes from 'prop-types';
import React, {useState} from 'react';

import Loader from '#root/components/loader';
import {noop} from '#root/utils/componentHelpers';

const fetchCouponQuery = gql`
query FetchCoupon($couponId: String!) {
  coupon(couponId: $couponId) {
    amount_off
    duration
    duration_in_months
    id
    name
    percent_off
  }
}
`;

const ApplyCoupon = ({onCancel: handleCancel, onComplete: handleComplete}) => {
  const [couponId, setCouponId] = useState('');

  const [fetchCoupon, {data: {coupon} = {}, error, loading}] = useLazyQuery(fetchCouponQuery, {
    variables: {couponId}
  });

  if (coupon) {
    handleComplete(coupon);
  }

  const handleSubmit = async () => {
    if (!couponId || couponId === '') {
      return;
    }

    await fetchCoupon({
      variables: {couponId}
    });
  };

  return (
    <div className="apply-coupon">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="input"
            id="coupon"
            name="coupon"
            onChange={e => setCouponId(e.target.value)}
            placeholder="Coupon Code"
            type="text"
          />
          {error ? <small className="form-text error">Coupon <strong>{couponId}</strong> not found.</small> : null}
        </div>
        <div className="buttons">
          <button
            className="btn btn--primary-solid"
            disabled={loading}
            onClick={handleSubmit}
            role="button"
            type="submit"
          >
            {loading ? <Loader colors={['#252525', '#252525']} id="coupon-loader" loading={loading} /> : 'Apply'}
          </button>
          <button
            className="btn btn--primary"
            disabled={loading}
            onClick={handleCancel}
            role="button"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

ApplyCoupon.propTypes = {
  onCancel: PropTypes.func,
  onComplete: PropTypes.func
};

ApplyCoupon.defaultProps = {
  onCancel: noop,
  onComplete: noop
};

export default ApplyCoupon;
