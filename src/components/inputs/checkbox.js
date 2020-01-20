import * as PropTypes from 'prop-types';
import React from 'react';

import {noop} from '../../utils/componentHelpers';

const Checkbox = ({style, checked, children, onChange, id, name, register, error, label}) => {
  const inputProps = {
    type: 'checkbox',
    id,
    name
  };

  if (onChange) {
    inputProps.onChange = onChange;
    inputProps.checked = checked;
  } else if (register) {
    inputProps.ref = register;
  }

  return (
    <>
    <div className={`checkbox ${checked ? 'checked' : ''}`} style={style}>
      <input {...inputProps}/>
      <label htmlFor={id}>{children}</label>
    </div>
    {error ? (
      <p className="form-text small error">
        {error.type === 'required' ? `${label} is required.` : null}
      </p>
    ) : null}
    </>
  );
};

Checkbox.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func
};

Checkbox.defaultProps = {
  id: 'checkbox',
  name: 'checkbox',
  register: noop
};

export default Checkbox;
