import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import Loader from './loader';

const DashboardCredentialList = ({title, children, loading}) => {
  return (
    <div className="dashboard-credential-list">
      <h4>{title} <span/></h4>
      {loading ? <Loader center={false} position="relative"/> : null}
      <ul>
        {children.map((child, index) => (
          <li key={index}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};

DashboardCredentialList.propTypes = {
  children: ImmutablePropTypes.list,
  title: PropTypes.string,
  loading: PropTypes.bool
};

DashboardCredentialList.defaultProps = {
  children: List()
};

export default DashboardCredentialList;
