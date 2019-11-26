import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import Link from 'next/link';

import {selectors as userSelectors} from '../redux/ducks/user';
import {Routes} from '../routes';

const ResumeProduct = ({resumeUrl, user, productTerm, className, started}) => {
  let resumeText = `${started ? 'Resume' : 'Start'} ${productTerm}`;

  if (!user.get('enrolled')) {
    resumeUrl = Routes.Signup;
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
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(ResumeProduct);
