import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {noop, canUseDOM} from '../utils/componentHelpers';
import {Routes} from '../routes';
import config from '../config';

const CheckoutFooter = ({disabled, onClick, btnType, error, loading, loginRedirect, showLogin, btnText}) => {
  return (
    <div className="checkout-footer">
      {error && error !== '' ? (
        <div className="form-message">
          <p className="form-text small error">{error}</p>
        </div>
      ) : null}
      <button type={btnType} onClick={onClick} disabled={disabled || loading} className="btn btn--primary-solid">
        {btnText}
      </button>
      <div className="helper-links">
        {showLogin ? (
          <Link href={{pathname: Routes.Login, query: {redirectTo: loginRedirect}}}>
            <a>Already have an account?</a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

CheckoutFooter.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  btnType: PropTypes.string,
  error: PropTypes.string,
  loginRedirect: PropTypes.string,
  showLogin: PropTypes.bool,
  btnText: PropTypes.string
};

CheckoutFooter.defaultProps = {
  onClick: noop,
  loginRedirect: canUseDOM() ? `${window.location.origin}${Routes.Signup}` : '',
  showLogin: true,
  btnText: 'Next Step'
};

export default CheckoutFooter;
