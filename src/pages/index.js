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
import {state} from '../utils/componentHelpers';
import {DEFAULT_VIEW_ANIMATION_TIME, DEFAULT_VIEW_ANIMATION_FROM} from '../utils/animations';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'max@d3applications.com',
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
      password: this.state.password
    });
  }

  render() {
    const {email, password} = this.state;
    const {loading, error} = this.props;
    return (
      <div className="view">
        <div className="row">
          <div className="col-12 col-sm-6">
            <img src="//source.unsplash.com/1000x1700" style={{maxWidth: '100%', height: 'auto', width: '100%'}} alt=""/>
          </div>
          <div className="col-12 col-sm-6">
            <form onSubmit={this.handleSubmit}>
              <h1>Login</h1>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email" placeholer="email" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="password" className="input" onChange={state(this.handleChange, 'password')} value={password} required/>
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
                <Link href="/forgot"><a className="small">Forgot Password</a></Link>
              </div>
            </form>
          </div>
        </div>
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

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

Home.animationTimeline = node => {
  const timeline = new Timeline({paused: true});
  const h1 = node.querySelector('h1');
  const inputs = [...node.querySelectorAll('input'), ...node.querySelectorAll('.submit')];

  timeline
    .from(node, DEFAULT_VIEW_ANIMATION_TIME, DEFAULT_VIEW_ANIMATION_FROM)
    .from(h1, 0.4, {autoAlpha: 0, x: 10, ease: Power1.easeInOut})
    .staggerFrom(inputs, 0.3, {autoAlpha: 0, y: 20, ease: Power1.easeInOut}, 0.1);

  return timeline;
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
