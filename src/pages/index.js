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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'maxbaun@gmail.com',
      password: 'password'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.login({
      email: this.state.email,
      password: this.state.password,
      redirectTo: 'http://maven.info:3000/about'
    });
  }

  render() {
    const {email, password} = this.state;
    const {loading, error} = this.props;
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {error ? <h5>{error}</h5> : null}
          <input type="text" placeholer="email" onChange={state(this.handleChange, 'email')} value={email}/>
          <br/>
          <input type="password" placeholder="password" onChange={state(this.handleChange, 'password')} value={password}/>
          <br/>
          <input type="submit" value="Login" disabled={loading} />
        </form>
      </Layout>
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

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
