import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TimelineMax as Timeline, Power1} from 'gsap';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {state} from '../utils/componentHelpers';
import {DEFAULT_VIEW_ANIMATION_TIME, DEFAULT_VIEW_ANIMATION_FROM} from '../utils/animations';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user ? props.user.get('email') : '',
      password: '',
      first_name: props.user ? props.user.get('first_name') : '',
      last_name: props.user ? props.user.get('last_name') : ''
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
    const {email, password, first_name, last_name} = this.state;
    const {loading, error} = this.props;

    return (
      <div className="view">
        <div className="content">
          <div className="content__inner">
            <div className="row">
              <div className="col-12 col-sm-6">
                <img src="//source.unsplash.com/1000x1700" style={{maxWidth: '100%', height: 'auto', width: '100%'}} alt=""/>
              </div>
              <div className="col-12 col-sm-6">
                <form onSubmit={this.handleSubmit}>
                  <h1>Register</h1>
                  {error ? <h5>{error}</h5> : null}
                  <input type="email" placeholder="email" onChange={state(this.handleChange, 'email')} value={email}/>
                  <br/>
                  <input type="password" placeholder="password" onChange={state(this.handleChange, 'password')} value={password}/>
                  <br/>
                  <input type="text" placeholder="first_name" onChange={state(this.handleChange, 'first_name')} value={first_name}/>
                  <br/>
                  <input type="text" placeholder="last_name" onChange={state(this.handleChange, 'last_name')} value={last_name}/>
                  <br/>
                  <input type="submit" value="Register" disabled={loading}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  const h1 = node.querySelector('h1');
  const inputs = node.querySelectorAll('input');

  timeline
    .from(node, DEFAULT_VIEW_ANIMATION_TIME, DEFAULT_VIEW_ANIMATION_FROM)
    .from(h1, 0.4, {autoAlpha: 0, x: 10, ease: Power1.easeInOut})
    .staggerFrom(inputs, 0.3, {autoAlpha: 0, y: 20, ease: Power1.easeInOut}, 0.1);

  return timeline;
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
