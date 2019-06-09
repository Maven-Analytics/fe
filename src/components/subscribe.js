import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {state} from '../utils/componentHelpers';

class Subscribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('subscribe submitted');
  }

  render() {
    const {email} = this.state;
    const {helperText} = this.props;

    return (
      <div className="subscribe">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email address</label>
          <div className="form-group">
            <input
              required
              className="input"
              id="email"
              name="email"
              placeholder="barry@hbo.com"
              type="email"
              onChange={state(this.handleChange, 'email')}
              value={email}
            />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </div>
          {helperText ? <small className="form-text">{helperText}</small> : null}
        </form>
      </div>
    );
  }
}

Subscribe.propTypes = {
  helperText: PropTypes.string,
  email: PropTypes.string
};

export default Subscribe;
