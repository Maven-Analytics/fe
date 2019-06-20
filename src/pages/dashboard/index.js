import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, List} from 'immutable';

import {selectors as userSelectors} from '../../redux/ducks/user';
import {actions as profileActions} from '../../redux/ducks/profile';
import DashboardLayout from '../../layouts/dashboard';
import Profile from '../../components/dashboard/profile';

const Dashboard = ({actions, user}) => {
  return (
    <DashboardLayout>
      <Profile
        user={user}
        actions={actions}
      />
    </DashboardLayout>
  );
};

Dashboard.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

Dashboard.defaultProps = {
  user: Map(),
  recommendedPaths: List(),
  recommendedCourses: List()
};

Dashboard.getInitialProps = DashboardLayout.getInitialProps;

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
