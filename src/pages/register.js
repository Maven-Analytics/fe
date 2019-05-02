import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TimelineMax as Timeline, Power1} from 'gsap';
import Link from 'next/link';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {state} from '../utils/componentHelpers';
import Image from '../components/image';
import {DEFAULT_VIEW_ANIMATION_TIME, DEFAULT_VIEW_ANIMATION_FROM} from '../utils/animations';
import Auth from '../components/auth';
import countries from '../utils/countries';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user ? props.user.get('email') : '',
      password: '',
      first_name: props.user ? props.user.get('first_name') : '',
      last_name: props.user ? props.user.get('last_name') : '',
      country: props.user ? props.user.get('country') : ''
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
      last_name: this.state.last_name
    });
  }

  render() {
    const {email, password, first_name, last_name, country} = this.state;
    const {loading, error} = this.props;

    return (
      <Auth imageAlt="Image Alt" imageSrc="//images.unsplash.com/photo-1556151450-61a07fc5964e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=1024&fit=crop&ixid=eyJhcHBfaWQiOjF9">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              required
              className="input"
              id="email"
              name="email"
              onChange={state(this.handleChange, 'email')}
              placeholder="Email"
              value={email}
              type="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required
              className="input"
              id="password"
              name="password"
              onChange={state(this.handleChange, 'password')}
              placeholder="Password"
              value={password}
              type="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              required
              className="input"
              id="first_name"
              name="first_name"
              onChange={state(this.handleChange, 'first_name')}
              placeholder="First Name"
              value={first_name}
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              required
              className="input"
              id="last_name"
              name="last_name"
              onChange={state(this.handleChange, 'last_name')}
              placeholder="last_name"
              value={last_name}
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              required
              className="input"
              onChange={state(this.handleChange, 'country')}
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
          <div className="form-message">
            {error ? (
              <p className="form-text small error">{error}</p>
            ) : null}
          </div>
          <div className="form-footer">
            <button type="submit" className="btn btn--primary" disabled={loading}>Register</button>
            <Link href="/"><a className="small">Already have an account?</a></Link>
          </div>
        </form>
      </Auth>
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
  error: PropTypes.string.isRequired,
  user: ImmutablePropTypes.map
};

Register.animationTimeline = node => {
  const timeline = new Timeline({paused: true});
  const inputs = [...node.querySelectorAll('.form-group'), ...node.querySelectorAll('.form-footer')];

  timeline
    // .from(h1, 0.4, {autoAlpha: 0, x: 10, ease: Power1.easeInOut})
    .staggerFrom(inputs, 0.3, {autoAlpha: 0, y: 20, ease: Power1.easeInOut}, 0.1);

  return timeline;
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
