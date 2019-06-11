import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {noop} from '../utils/componentHelpers';

const CheckoutFooter = ({disabled, onClick, btnType, error, loading}) => {
  return (
    <div className="checkout-footer">
      {error && error !== '' ? (
        <div className="form-message">
          <p className="form-text small error">{error}</p>
        </div>
      ) : null}
      <button type={btnType} onClick={onClick} disabled={disabled || loading} className="btn btn--primary-solid">
        Next Step
      </button>
      <div className="helper-links">
        <Link href="/login">
          <a>Already have an account?</a>
        </Link>
      </div>
    </div>
  );
};

CheckoutFooter.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  btnType: PropTypes.string,
  error: PropTypes.string
};

CheckoutFooter.defaultProps = {
  onClick: noop
};

export default CheckoutFooter;
