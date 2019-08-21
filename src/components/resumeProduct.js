import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import Link from 'next/link';

import {selectors as userSelectors} from '../redux/ducks/user';
import {selectors as checkoutSelectors} from '../redux/ducks/checkout';
import {getCheckoutUrl} from '../utils/checkoutHelpers';
import {Routes} from '../routes';

const ResumeProduct = ({resumeUrl, user, productTerm, className, started, checkout}) => {
  let resumeText = `${started ? 'Resume' : 'Start'} ${productTerm}`;

  if (!user.get('enrolled')) {
    const checkoutUrl = getCheckoutUrl(checkout);
    resumeUrl = checkoutUrl ? checkoutUrl : Routes.Signup;
    resumeText = 'Signup';
  }

  return (
    <Link href={resumeUrl}>
      <a className={className}>{resumeText}</a>
    </Link>
  );
};

ResumeProduct.propTypes = {
  user: ImmutablePropTypes.map,
  resumeUrl: PropTypes.string,
  productTerm: PropTypes.string,
  className: PropTypes.string,
  started: PropTypes.bool,
  checkout: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  checkout: checkoutSelectors.getCheckout(state)
});

export default connect(mapStateToProps)(ResumeProduct);
