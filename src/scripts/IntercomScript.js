import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Intercom from 'react-intercom';
import {connect} from 'react-redux';

import accessConfig from '#root/utils/accessConfig';

import {selectors as userSelectors} from '../redux/ducks/user';

class IntercomScript extends Component {
  render() {
    if (accessConfig('DISABLE_INTERCOM', false)) {
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
