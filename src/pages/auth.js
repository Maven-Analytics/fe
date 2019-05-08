import React from 'react';
import PropTypes from 'prop-types';
import {TimelineMax as Timeline, Power1} from 'gsap';

import Image from '../components/image';
import Register from '../components/register';
import Login from '../components/login';
const Forms = {
  Register,
  Login
};

const Auth = props => {
  const {imageSrc, imageAlt, form} = props;
  const FormComponent = Forms[form];
  return (
    <div className="auth">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="auth__image-wrap">
              <Image preload src={imageSrc} alt={imageAlt} modifier="image--cover image--gradient auth__image"/>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row h-100 align-items-md-center">
              <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <div id="auth-form" className="auth__form">
                  <Image src="//via.placeholder.com/242x58/20E2D7/fff?text=Maven%20Logo" alt="Maven Analytics Logo" modifier="auth__logo"/>
                  <FormComponent/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Auth.getInitialProps = ctx => {
  const {asPath} = ctx;
  let form = '';

  if (asPath.indexOf('login') > -1) {
    form = 'Login';
  } else if (asPath.indexOf('register') > -1) {
    form = 'Register';
  }

  return {
    form
  };
};

Auth.animationTimeline = node => {
  const timeline = new Timeline({paused: true});
  const inputs = [...node.querySelectorAll('.form-group'), ...node.querySelectorAll('.form-footer')];
  const logo = node.querySelector('.auth__logo');
  const form = node.querySelector('#auth-form');

  timeline
    .from(form, 2, {authAlpha: 0, ease: Power1.easeInOut})
    .from(logo, 2, {autoAlpha: 0, ease: Power1.easeInOut})
    .staggerFrom(inputs, 0.3, {autoAlpha: 0, y: 20, ease: Power1.easeInOut}, 0.1);

  return timeline;
};

Auth.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired
};

Auth.defaultProps = {
  imageSrc: '//images.unsplash.com/photo-1556151450-61a07fc5964e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=720&h=1024&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  imageAlt: 'Image Alt'
};

export default Auth;
