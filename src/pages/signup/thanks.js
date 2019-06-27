import React from 'react';

import Checkout from '../../layouts/checkout';
import CheckoutThanks from '../../components/checkoutThanks';
import {Routes} from '../../routes';

const thanksContent = `
# Welcome to Maven Analytics
## Now Let's Get Started!

Let’s start by taking a quick survey so we can find the perfect courses and paths for your career goals!

The survey should take 3-5 minutes to complete and is designed to measure your career goals and create
a customized learning cirriculum.

[Start Survey](${Routes.WelcomeSurvey} "Start Survey")
`;

const SignupThanks = () => {
  return (
    <Checkout full>
      <CheckoutThanks content={thanksContent}/>
    </Checkout>
  );
};

export default SignupThanks;
