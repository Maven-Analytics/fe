import {List} from 'immutable';
import {Loader} from 'maven-ui';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DashboardCredentialList = ({title, children, loading}) => {
  return (
    <div className="dashboard-credential-list">
      <h4>{title} <span/></h4>
      {loading ? <Loader align="top-center" loading={loading}/> : null}
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
