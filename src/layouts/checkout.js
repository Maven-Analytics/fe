import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';

import CheckoutHeader from '../sections/checkoutHeader';
import CopyrightFooter from '../sections/copyrightFooter';
import Image from '../components/image';
import CheckoutSteps from '../components/checkoutSteps';
import Markdown from '../components/markdown';
import BaseLayout from './base';

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

const CheckoutLayout = ({children, activeStep, title, full, containerClass}) => {
  const Background = (
    <div className="layout-checkout__background">
      <Image
        wrapStyle={{
          paddingBottom: '62.42%'
        }}
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

  const Content = full ? (
    <div className="layout-checkout__wrap">
      <div className={containerClass}>
        {children}
      </div>
    </div>
  ) : (
    <div className="layout-checkout__wrap">
      <div className={containerClass}>
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
  );

  return (
    <BaseLayout
      header={CheckoutHeader}
      footer={CopyrightFooter}
      mainClass="layout-checkout"
    >
      {Background}
      {Content}
    </BaseLayout>
  );
};

CheckoutLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeStep: PropTypes.number,
  title: PropTypes.string,
  full: PropTypes.bool,
  containerClass: PropTypes.string
};

CheckoutLayout.defaultProps = {
  activeStep: 0,
  title: 'Select a membership plan',
  full: false,
  containerClass: 'container'
};

export default CheckoutLayout;

