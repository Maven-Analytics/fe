import React from 'react';
import PropTypes from 'prop-types';

import {noop} from '../../utils/componentHelpers';

const ChildCheckbox = ({style, checked, children, onChange, id, name}) => (
  <div className={`child-checkbox ${checked ? 'checked' : ''}`} style={style}>
    <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange}/>
    {children}
  </div>
);

ChildCheckbox.propTypes = {
  style: PropTypes.object,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string
};

ChildCheckbox.defaultProps = {
  onChange: noop,
  id: 'checkbox',
  name: 'checkbox'
};

export default ChildCheckbox;
