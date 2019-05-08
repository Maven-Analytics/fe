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
import Main from '../layouts/main';

class Home extends Component {
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
    return (
      <Main>
        This is the homepage
      </Main>
    );
  }
}

const mapStateToProps = state => ({
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
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

Home.animationTimeline = node => {
  const timeline = new Timeline({paused: true});
  const inputs = [...node.querySelectorAll('.form-group'), ...node.querySelectorAll('.form-footer')];
  // const logo = node.querySelector('.auth__logo');
  const form = node.querySelector('#auth-form');

  timeline
    .from(form, 2, {authAlpha: 0, ease: Power1.easeInOut})
    // .from(img, 2, {autoAlpha: 0, ease: Power1.easeInOut})
    .staggerFrom(inputs, 0.3, {autoAlpha: 0, y: 20, ease: Power1.easeInOut}, 0.1);

  return timeline;
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
