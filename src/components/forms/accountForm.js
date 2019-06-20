import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {state} from '../../utils/componentHelpers';
import countries from '../../utils/countries';

const AccountForm = ({showPassword, email, password, first_name, last_name, country, postal_code, onChange}) => {
  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          required
          className="input"
          id="email"
          name="email"
          onChange={state(onChange, 'email')}
          placeholder="jason@email.com"
          value={email}
          type="email"
        />
      </div>
      {showPassword ? (
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            required
            className="input"
            id="password"
            name="password"
            onChange={state(onChange, 'password')}
            value={password}
            type="password"
          />
        </div>
      ) : null}
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              required
              className="input"
              id="first_name"
              name="first_name"
              onChange={state(onChange, 'first_name')}
              value={first_name}
              type="text"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              required
              className="input"
              id="last_name"
              name="last_name"
              onChange={state(onChange, 'last_name')}
              value={last_name}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          required
          className="input"
          onChange={state(onChange, 'country')}
          id="country"
          name="country"
          value={country}
        >
          {countries.map(c => {
            return (
              <option key={c.value} value={c.value}>{c.label}</option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="postal_code">Postal Code</label>
        <input
          required
          className="input"
          id="postal_code"
          name="postal_code"
          onChange={state(onChange, 'postal_code')}
          value={postal_code}
          type="text"
        />
      </div>
    </Fragment>
  );
};

AccountForm.propTypes = {
  showPassword: PropTypes.bool,
  email: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  password: PropTypes.string,
  country: PropTypes.string.isRequired,
  postal_code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

AccountForm.defaultProps = {
  showPassword: true
};

export default AccountForm;

