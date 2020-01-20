import {Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ImageContentful from './imageContentful';

const DashboardCredential = ({image, title}) => {
  return (
    <div className="dashboard-credential">
      {title ? <div className="tooltip">{title}</div> : null}
      <ImageContentful image={image}/>
    </div>
  );
};

DashboardCredential.propTypes = {
  image: ImmutablePropTypes.map,
  title: PropTypes.string
};

DashboardCredential.defaultProps = {
  image: Map()
};

export default DashboardCredential;
