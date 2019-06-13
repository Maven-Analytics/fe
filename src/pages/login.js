import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Link from 'next/link';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {state} from '../utils/componentHelpers';
import Auth from '../layouts/auth';
import config from '../config';

class Login extends Component {
  static async getInitialProps(ctx) {
    console.log(ctx.query);
    return {
      redirectTo: ctx.query.redirectTo ? `${config.HOST_APP}${ctx.query.redirectTo}` : config.HOST_APP
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.redirectTo);
    this.props.actions.login({
      email: this.state.email,
      password: this.state.password,
      redirectTo: this.props.redirectTo || config.HOST_APP
    });
  }

  render() {
    const {email, password} = this.state;
    const {loading, error} = this.props;
    return (
      <Auth>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="text" name="email" id="email" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="input" onChange={state(this.handleChange, 'password')} value={password} required/>
          </div>
          {error ? (
            <div className="form-message">
              <p className="form-text small error">{error}</p>
            </div>
          ) : null}
          <div className="form-footer">
            <span className="submit">
              <button className="btn btn--primary-solid" type="submit" value="Login" disabled={loading}>Login</button>
            </span>
            <span className="links">
              <Link href="/forgot"><a>I forgot my password.</a></Link>
              <Link href="/signup"><a>{'I don\'t have an account yet. Sign me Up!'}</a></Link>
            </span>
          </div>
        </form>
      </Auth>
    );
  }
}

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['LOGIN'])(state),
  error: errorSelectors.getError(['LOGIN'])(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions
    }, dispatch)
  };
};

Login.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
