import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import Intercom from 'react-intercom';

import {selectors as userSelectors} from '../redux/ducks/user';
import config from '../config';

class IntercomScript extends Component {
  getSubscriptionStatus(user = this.props.user) {
    if (user.get('expired')) {
      return 'Expired';
    }

    if (user.get('is_free_trial')) {
      return 'Free trial';
    }

    return 'Paid subscription';
  }

  render() {
    if (config.DISABLE_INTERCOM) {
      return null;
    }

    const {user} = this.props;

    let userProps = {};

    if (user && user.get('id')) {
      userProps = {
        name: `${user.get('first_name')} ${user.get('last_name')}`,
        email: user.get('email'),
        created_at: user.get('createdAt'),
        subscription_status: this.getSubscriptionStatus(user)
      };
    }

    return (
      <Intercom
        appID="zvoe91eh"
        {...userProps}
      />
    );
  }
}

IntercomScript.propTypes = {
  user: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(IntercomScript);
