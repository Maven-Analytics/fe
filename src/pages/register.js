import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Layout from '../layouts/main';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {state} from '../utils/componentHelpers';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.register({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      redirectTo: 'http://localhost:3000/about'
    });
  }

  render() {
    const {email, password, first_name, last_name} = this.state;
    const {loading, error} = this.props;

    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          {error ? <h5>{error}</h5> : null}
          <input type="email" placeholer="email" onChange={state(this.handleChange, 'email')} value={email}/>
          <br/>
          <input type="password" placeholder="password" onChange={state(this.handleChange, 'password')} value={password}/>
          <br/>
          <input type="text" placeholer="first_name" onChange={state(this.handleChange, 'first_name')} value={first_name}/>
          <br/>
          <input type="text" placeholer="last_name" onChange={state(this.handleChange, 'last_name')} value={last_name}/>
          <br/>
          <input type="submit" value="Register" disabled={loading} />
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['REGISTER'])(state),
  error: errorSelectors.getError(['REGISTER'])(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions
    }, dispatch)
  };
};

Register.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
