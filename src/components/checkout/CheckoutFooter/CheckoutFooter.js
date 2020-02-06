import Link from 'next/link';
import * as PropTypes from 'prop-types';
import React from 'react';

import Loader from '#root/components/loader';
import {Routes} from '#root/routes';
import {canUseDOM, noop} from '#root/utils/componentHelpers';

const CheckoutFooter = ({disabled, onClick, btnType, error, loading, loginRedirect, showLogin, btnText}) => {
  return (
    <div className="checkout-footer">
      {error && error !== '' ? (
        <div className="form-message">
          <p className="form-text small error">{error}</p>
        </div>
      ) : null}
      <button type={btnType} onClick={onClick} disabled={disabled || loading} className="btn btn--primary-solid" style={{position: 'relative'}}>
        {loading ? <Loader id="checkoutFooterLoading" colors={['#252525', '#4F4F4F']} loading={loading}/> : btnText}
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
  error: PropTypes.any,
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
