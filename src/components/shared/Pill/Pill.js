import * as PropTypes from 'prop-types';
import React from 'react';

const Pill = ({className, children, style}) => {
  const classList = ['pill'];

  if (className) {
    classList.push(className);
  }

  return <span className={classList.join(' ')} style={style}>{children}</span>;
};

Pill.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  style: PropTypes.object
};

Pill.defaultProps = {
  style: {}
};

export default Pill;
