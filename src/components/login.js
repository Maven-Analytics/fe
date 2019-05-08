import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Link from 'next/link';
import {TimelineMax as Timeline, Power1, Power4} from 'gsap';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {state} from '../utils/componentHelpers';
import Auth from '../components/auth';
import {DEFAULT_VIEW_ANIMATION_TIME, DEFAULT_VIEW_ANIMATION_FROM} from '../utils/animations';

class Login extends Component {
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
    this.props.actions.login({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    const {email, password} = this.state;
    const {loading, error} = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" id="email" placeholder="Email Address" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="input" onChange={state(this.handleChange, 'password')} value={password} required/>
          </div>
          <div className="form-message">
            {error ? (
              <p className="form-text small error">{error}</p>
            ) : null}
          </div>
          <div className="form-footer">
            <span className="submit">
              <button className="btn btn--primary" type="submit" value="Login" disabled={loading}>Login</button>
            </span>
            <span>
              <Link href="/forgot"><a className="small d-block">Forgot Password</a></Link>
              <Link as="/register" href="/auth?form=Register"><a className="small d-block">Register</a></Link>
            </span>
          </div>
        </form>
      </div>
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
  error: PropTypes.string.isRequired
};

Login.animationTimeline = node => {
  const timeline = new Timeline({paused: true});
  const inputs = [...node.querySelectorAll('.form-group'), ...node.querySelectorAll('.form-footer')];
  const logo = node.querySelector('.auth__logo');
  const form = node.querySelector('#auth-form');

  timeline
    .from(form, 2, {authAlpha: 0, ease: Power1.easeInOut})
    // .from(img, 2, {autoAlpha: 0, ease: Power1.easeInOut})
    .staggerFrom(inputs, 0.3, {autoAlpha: 0, y: 20, ease: Power1.easeInOut}, 0.1);

  return timeline;
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
