import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import Intercom from 'react-intercom';

import {selectors as userSelectors} from '../redux/ducks/user';
import {selectors as subscriptionSelectors} from '../redux/ducks/subscription';
import config from '../config';
import {subscriptionStatuses} from '../constants';

class IntercomScript extends Component {
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
        created_at: user.get('createdAt')
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
