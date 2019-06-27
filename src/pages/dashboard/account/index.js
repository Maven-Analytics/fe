import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, List} from 'immutable';

import {selectors as userSelectors} from '../../../redux/ducks/user';
import {actions as profileActions} from '../../../redux/ducks/profile';
import AccountLayout from '../../../layouts/account';
import Profile from '../../../forms/profile';

const AccountProfile = ({actions, user}) => {
  return (
    <AccountLayout title="My Account" cardTitle="Your Profile" activeLink={0}>
      <Profile
        user={user}
        actions={actions}
      />
    </AccountLayout>
  );
};

AccountProfile.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

AccountProfile.defaultProps = {
  user: Map(),
  recommendedPaths: List(),
  recommendedCourses: List()
};

AccountProfile.getInitialProps = AccountLayout.getInitialProps;

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...profileActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
