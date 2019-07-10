import React from 'react';
import PropTypes from 'prop-types';

import {noop} from '../../utils/componentHelpers';

const Checkbox = ({style, checked, children, onChange, id, name}) => (
  <div className={`checkbox ${checked ? 'checked' : ''}`} style={style}>
    <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange}/>
    <label htmlFor={id}>{children}</label>
  </div>
);

Checkbox.propTypes = {
  style: PropTypes.object,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string
};

Checkbox.defaultProps = {
  onChange: noop,
  id: 'checkbox',
  name: 'checkbox'
};

export default Checkbox;
