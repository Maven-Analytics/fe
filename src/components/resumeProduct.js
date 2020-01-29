import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {useSelector} from 'react-redux';

import {selectors as stateSelectors} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {noop} from '#root/utils/componentHelpers';

import EnrolledUser from './helpers/EnrolledUser';
import UnenrolledUser from './helpers/UnenrolledUser';

const ResumeProduct = ({resumeUrl, productTerm, className, started, onClick: handleClick}) => {
  const state = useSelector(stateSelectors.getState);
  const thinkificHealthy = state.getIn(['health', 'thinkific']);

  return (
    <>
      <EnrolledUser>
        <Link prefetch={false} href={thinkificHealthy ? resumeUrl : Routes.Error}>
          <a className={className} onClick={handleClick}>
            {`${started ? 'Resume' : 'Start'} ${productTerm}`}
          </a>
        </Link>
      </EnrolledUser>
      <UnenrolledUser>
        <Link href={thinkificHealthy ? Routes.Signup : Routes.Error}>
          <a className={className} onClick={handleClick}>Signup</a>
        </Link>
      </UnenrolledUser>
    </>
  );
};

ResumeProduct.propTypes = {
  onClick: PropTypes.func,
  user: ImmutablePropTypes.map,
  resumeUrl: PropTypes.string,
  productTerm: PropTypes.string,
  className: PropTypes.string,
  started: PropTypes.bool,
  checkout: ImmutablePropTypes.map
};

ResumeProduct.defaultProps = {
  onClick: noop
};

export default ResumeProduct;
