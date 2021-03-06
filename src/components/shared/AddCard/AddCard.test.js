import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

jest.mock('react-stripe-elements', () => {
  return {
    StripeProvider: ({children}) => {
      return children;
    },
    // eslint-disable-next-line react/display-name
    CardElement: () => {
      return (
        <div className="card-element"></div>
      );
    },
    injectStripe: component => {
      component.defaultProps = {
        ...component.defaultProps,
        elements: {
          getElement: str => str
        },
        stripe: {
          createPaymentMethod: () => ({
            paymentMethod: 'paymentMethod'
          })
        }
      };

      return component;
    }
  };
});

beforeEach(() => {
  jest.resetModules();
});

it('Should match the snapshot', () => {
  const AddCard = require('./AddCard').default;

  const wrapper = shallow(
    <AddCard/>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Should render buttons if showButtons is true', () => {
  const AddCard = require('./AddCard').default;

  const wrapper = shallow(
    <AddCard showButtons={true}/>
  );

  expect(wrapper.find('.buttons').length).toEqual(1);
});

it('Should not render buttons if showButtons is false', () => {
  const AddCard = require('./AddCard').default;

  const wrapper = shallow(
    <AddCard showButtons={false}/>
  );

  expect(wrapper.find('.buttons').length).toEqual(0);
});
