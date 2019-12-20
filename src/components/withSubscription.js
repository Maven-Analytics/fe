import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import {selectors as subscriptionSelectors} from '../redux/ducks/subscription';

const withSubscription = WrappedComponent => {
  class WithState extends PureComponent {
    render() {
      const {subscription, ...rest} = this.props;

      return <WrappedComponent {...rest} subscription={subscription}/>;
    }
  }

  WithState.propTypes = {
    subscription: ImmutablePropTypes.map
  };

  const mapStateToProps = state => ({
    subscription: subscriptionSelectors.getSubscription(state)
  });

  return connect(mapStateToProps)(WithState);
};

export default withSubscription;
