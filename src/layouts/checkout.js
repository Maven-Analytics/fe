import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';

import CheckoutHeader from '../sections/checkoutHeader';
import CopyrightFooter from '../sections/copyrightFooter';
import Image from '../components/image';
import CheckoutSteps from '../components/checkoutSteps';
import Markdown from '../components/markdown';
import BaseLayout from './base';
import GlobalHeader from '../sections/globalHeader';

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

Subscriptions include access to ALL courses, paths, assessments, and personalized resources. No obligation, 100% satisfaction guarantee.

- Unlimited access to ALL courses & paths
- Personalized recommendations
- Interactive skills assessments
- Private student dashboard
- Downloadable project files and resources
- 1-on-1 instructor support
- Verified digital credentials
- Regular content updates
- 100% satisfaction guarantee
`;

const CheckoutLayout = ({children, activeStep, title, full, containerClass, fullNav}) => {
  const Background = (
    <div className="layout-checkout__background">
      <Image
        wrapStyle={{
          paddingBottom: '62.42%'
        }}
        placeholderColor="#252525"
        sources={[
          {
            srcSet: '/static/img/checkout-bg-mobile.webp 1000w',
            type: 'image/webp'
          },
          {
            srcSet: '/static/img/checkout-bg-mobile.jpg 1000w',
            type: 'image/jpeg'
          },
          {
            srcSet: '/static/img/checkout-bg-desktop.webp 2307w',
            type: 'image/webp'
          },
          {
            srcSet: '/static/img/checkout-bg-desktop.jpg 2307w',
            type: 'image/jpeg'
          }
        ]}
        src="/static/img/checkout-bg-mobile.jpg"
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
      header={fullNav ? GlobalHeader : CheckoutHeader}
      footer={CopyrightFooter}
      mainClass="layout-checkout"
      headerClass="global-header--checkout"
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
  containerClass: PropTypes.string,
  fullNav: PropTypes.bool
};

CheckoutLayout.defaultProps = {
  activeStep: 0,
  title: 'Select a membership plan',
  full: false,
  containerClass: 'container container--lg',
  fullNav: false
};

export default CheckoutLayout;

