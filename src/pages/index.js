import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';
import Link from 'next/link';
import {TimelineMax as Timeline, Power1} from 'gsap';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import Main from '../layouts/main';
import Hero from '../components/hero';
import StatCounter from '../components/statCounter';

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
        <Hero/>
        <StatCounter
          stats={fromJS([
            {
              value: 158,
              text: 'Countries Represented'
            },
            {
              value: 300,
              text: 'Training Videos',
              postFix: '+'
            },
            {
              value: 5000,
              text: '5-Star Reviews',
              postFix: '+'
            },
            {
              value: 100,
              text: 'Happy Students',
              postFix: 'K+'
            }
          ])}
        />
        <div className="container">

          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
