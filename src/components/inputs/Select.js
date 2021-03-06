import * as PropTypes from 'prop-types';
import React from 'react';

const Select = ({className, disabled, id, label, options, name, register, required}) => {
  return (
    <div className="form-group">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select
        disabled={disabled}
        required={required}
        ref={register}
        className={className}
        id={id}
        name={name}
      >
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>{option.label}</option>
          );
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    value: PropTypes.any
  })).isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool
};

Select.defaultProps = {
  className: 'input',
  disabled: false,
  required: false
};

export default Select;
