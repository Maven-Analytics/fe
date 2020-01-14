import * as PropTypes from 'prop-types';
import React from 'react';

import {noop} from '#root/utils/componentHelpers';

const TextBox = ({className, type, register, name, label, id, required, placeholder}) => {
  console.log(register);
  return (
    <div className="form-group">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        className={className}
        id={id}
        name={name}
        placeholder={placeholder}
        ref={register}
        required={required}
        type={type}
      />
    </div>
  );
};

TextBox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string
};

TextBox.defaultProps = {
  className: 'input',
  placeholder: null,
  required: false,
  type: 'text'
};

export default TextBox;
