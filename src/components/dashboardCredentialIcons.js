import {List} from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DashboardCredentialIcons = ({children}) => {
  return (
    <div className="dashboard-credential-icons">
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

DashboardCredentialIcons.propTypes = {
  children: ImmutablePropTypes.list
};

DashboardCredentialIcons.defaultProps = {
  children: List()
};

export default DashboardCredentialIcons;
