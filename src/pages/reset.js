import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Link from 'next/link';
import {TimelineMax as Timeline, Power1} from 'gsap';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as responseSelectors} from '../redux/ducks/response';
import {state} from '../utils/componentHelpers';
import Auth from '../components/auth';

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
      <Auth imageSrc="//images.unsplash.com/photo-1556151450-61a07fc5964e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=1024&fit=crop&ixid=eyJhcHBfaWQiOjF9">
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
            {response ? (
              <p className="form-text small success">{response}</p>
            ) : null}
          </div>
          <div className="form-footer">
            <span className="submit">
              <button className="btn btn--primary" type="submit" disabled={loading}>Reset Password</button>
            </span>
            <span>
              <Link href="/login"><a className="small d-block">Login</a></Link>
              <Link href="/register"><a className="small d-block">Register</a></Link>
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
  return {
    token: ctx.query.token
  };
};

Reset.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

Reset.animationTimeline = node => {
  const timeline = new Timeline({paused: true});
  const inputs = [...node.querySelectorAll('.form-group'), ...node.querySelectorAll('.form-footer')];
  const logo = node.querySelector('.auth__logo');
  const form = node.querySelector('#auth-form');

  timeline
    // .from(form, 2, {authAlpha: 0, ease: Power1.easeInOut})
    // .from(img, 2, {autoAlpha: 0, ease: Power1.easeInOut})
    .staggerFrom(inputs, 0.3, {autoAlpha: 0, y: 20, ease: Power1.easeInOut}, 0.1);

  return timeline;
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);