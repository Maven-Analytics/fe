import PropTypes from 'prop-types';
import React from 'react';

import BrochureTitle from './brochureTitle';

const BrochureContent = ({children, className, title}) => (
  <div className={['brochure-content', className ? className : ''].join(' ')}>
    <div className="container">
      {title ? <BrochureTitle title={title}/> : null}
      {children}
    </div>
  </div>
);

BrochureContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string
};

export default BrochureContent;
