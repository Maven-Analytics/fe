import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import Link from 'next/link';

import CheckoutHeader from '../sections/checkoutHeader';
import Copyright from '../sections/copyright';
import Image from '../components/image';
import CheckoutSteps from '../components/checkoutSteps';
import Markdown from '../components/markdown';

import '../styles/checkout.scss';

const checkoutLinks = fromJS([
  {
    text: 'Choose your plan',
    url: '/signup'
  },
  {
    text: 'Account Setup',
    url: '/signup/account'
  },
  {
    text: 'Confirm & Pay',
    url: '/'
  }
]);

const promoMd = `
## YOU’RE ONE STEP
## CLOSER TO BECOMING A
## **Data Rockstar**

One monthly subscription. Access to ALL courses, paths and personalized learning experiences. 100% satisfaction guaranteed. No obligation cancel anytime.

- Unlimited access to ALL COURSES & PATHS
- Personalized learning paths & course plans
- Hands-on demos and course materials
- Skills assessments & benchmarks
- 1-on-1 Instructor support
- Completion Certifications & Accredations
- 100% Satisfaction Guarantee
- Regular updates and new course content
`;

const Checkout = ({children, activeStep, title, full}) => {
  const Background = (
    <div className="layout-checkout__background">
      <Image
        cover
        placeholderColor="#252525"
        src="/static/img/home-hero-mobile.jpg"
        srcSet="
          /static/img/home-hero-mobile.webp 1000w,
          /static/img/home-hero-mobile.jpg 1000w,
          /static/img/home-hero-desktop.webp 2307w,
          /static/img/home-hero-desktop.jpg 2307w
        "
      />
    </div>
  );

  if (full) {
    return (
      <Fragment>
        <CheckoutHeader/>
        <main id="main" className="layout-checkout">
          {Background}
          <div className="layout-checkout__wrap">
            <div className="container">
              {children}
            </div>
          </div>
        </main>
        <footer>
          <Copyright/>
        </footer>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <CheckoutHeader/>
      <main id="main" className="layout-checkout">
        {Background}
        <div className="layout-checkout__wrap">
          <div className="container">
            <CheckoutSteps links={checkoutLinks} activeIndex={activeStep}/>
            <div className="layout-checkout__row">
              <div className="layout-checkout__content">
                <h1 className="layout-checkout__title">{title}</h1>
                {children}
              </div>
              <Markdown className="layout-checkout__promo" content={promoMd}/>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Copyright/>
      </footer>
    </Fragment>
  );
};

Checkout.propTypes = {
  children: PropTypes.node.isRequired,
  activeStep: PropTypes.number,
  title: PropTypes.string,
  full: PropTypes.bool
};

Checkout.defaultProps = {
  activeStep: 0,
  title: 'Select a membership plan',
  full: false
};

export default Checkout;

