import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Link from 'next/link';
import Router from 'next/router';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as responseSelectors} from '../redux/ducks/response';
import {state} from '../utils/componentHelpers';
import Auth from '../layouts/auth';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: props.token
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.reset({
      email: this.state.email,
      password: this.state.password,
      token: this.state.token
    });
  }

  render() {
    const {email, password} = this.state;
    const {loading, error, response} = this.props;
    return (
      <Auth>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" id="email" placeholder="Email Address" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="input" onChange={state(this.handleChange, 'password')} value={password} required/>
          </div>
          {error || response ? (
            <div className="form-message">
              {error ? (
                <p className="form-text small error">{error}</p>
              ) : null}
              {response ? (
                <p className="form-text small success">{response}</p>
              ) : null}
            </div>
          ) : null}
          <div className="form-footer">
            <span className="submit">
              <button className="btn btn--primary-solid" type="submit" style={{minWidth: 220}} disabled={loading}>Reset Password</button>
            </span>
            <span className="links">
              <Link href="/login"><a>Back to Login</a></Link>
              <Link href="/signup"><a>{'I don\'t have an account yet. Sign me Up!'}</a></Link>
            </span>
          </div>
        </form>
      </Auth>
    );
  }
}

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['RESET'])(state),
  error: errorSelectors.getError(['RESET'])(state),
  response: responseSelectors.getResponse(['RESET'])(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions
    }, dispatch)
  };
};

Reset.getInitialProps = ctx => {
  const {res, query} = ctx;

  if (!query.token) {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      });
      res.end();

      return;
    }

    Router.push('/');
  }

  return {
    token: query.token
  };
};

Reset.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
