import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {Routes} from '../routes';
import EnrolledUser from './helpers/EnrolledUser';
import UnenrolledUser from './helpers/UnenrolledUser';

const ResumeProduct = ({resumeUrl, productTerm, className, started}) => {
  return (
    <>
      <EnrolledUser>
        <Link prefetch={false} href={resumeUrl}>
          <a className={className}>
            {`${started ? 'Resume' : 'Start'} ${productTerm}`}
          </a>
        </Link>
      </EnrolledUser>
      <UnenrolledUser>
        <Link href={Routes.Signup}>
          <a className={className}>Signup</a>
        </Link>
      </UnenrolledUser>
    </>
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

export default ResumeProduct;
