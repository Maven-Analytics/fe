import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Link from 'next/link';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as responseSelectors} from '../redux/ducks/response';
import {state} from '../utils/componentHelpers';
import Auth from '../layouts/auth';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.forgot({
      email: this.state.email
    });
  }

  render() {
    const {email} = this.state;
    const {loading, error, response} = this.props;
    return (
      <Auth>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="text" name="email" id="email" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
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
              <button className="btn btn--primary-solid" style={{minWidth: 220}} type="submit" disabled={loading}>Reset My Password</button>
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
  loading: loadingSelectors.getLoading(['FORGOT'])(state),
  error: errorSelectors.getError(['FORGOT'])(state),
  response: responseSelectors.getResponse(['FORGOT'])(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions
    }, dispatch)
  };
};

Forgot.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
