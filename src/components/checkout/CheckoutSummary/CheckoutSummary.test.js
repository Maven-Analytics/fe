import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import {trialLength} from '#root/constants';
import {formatDatePretty} from '#root/utils/componentHelpers';

import CheckoutSummary from './';

describe('<CheckoutSummary/>', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('Should match the snapshot', () => {
    const wrapper = shallow(
      <CheckoutSummary
        amountToday={2900}
        interval="month"
        planName="Plan Name"
        planPrice={29}
      />
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should render a date 7 days in the future if hasTrial is true', () => {
    const wrapper = shallow(
      <CheckoutSummary
        hasTrial
        amountToday={2900}
        interval="month"
        planName="Plan Name"
        planPrice={29}
      />
    );

    const dateStr = formatDatePretty(new Date().getTime() + trialLength);

    const renewText = wrapper.find('.renews').text();

    expect(renewText.includes(dateStr)).toBeTruthy();
  });

  it('Should render todays date if hasTrial is false', () => {
    const wrapper = shallow(
      <CheckoutSummary
        amountToday={2900}
        hasTrial={false}
        interval="month"
        planName="Plan Name"
        planPrice={29}
      />
    );

    const dateStr = formatDatePretty(new Date());

    const renewText = wrapper.find('.renews').text();

    expect(renewText.includes(dateStr)).toBeTruthy();
  });
});
