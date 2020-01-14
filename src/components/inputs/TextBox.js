import * as PropTypes from 'prop-types';
import React from 'react';

const TextBox = ({children, className, error, type, register, name, label, id, required, placeholder}) => {
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
      {error ? (
        <p className="form-text small error">
          {error.type === 'required' ? `${label} is required.` : null}
        </p>
      ) : null}
      {children}
    </div>
  );
};

TextBox.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  error: PropTypes.object,
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
