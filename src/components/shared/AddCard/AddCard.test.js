import {mount, shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import {act} from 'react-dom/test-utils';

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

describe('<AddCard/>', () => {
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

  test('Should call onComplete when the form is submitted', async () => {
    const onComplete = jest.fn();
    const addCardMock = jest.fn();
    const setLoadingMock = jest.fn();

    jest.doMock('./_addCard', () => ({
      __esModule: true,
      default: addCardMock
    }));

    const AddCard = require('./AddCard').default;

    let wrapper;

    await act(async () => {
      wrapper = mount(
        <AddCard onComplete={onComplete} setLoading={setLoadingMock}/>
      );
      wrapper.find('form').simulate('submit');
    });

    expect(addCardMock).toHaveBeenCalled();
    expect(onComplete).toHaveBeenCalled();
    expect(setLoadingMock).toHaveBeenCalledTimes(1);
  });
});
