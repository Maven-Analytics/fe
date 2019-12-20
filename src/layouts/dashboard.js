import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {isImmutable} from 'immutable';
import {bindActionCreators} from 'redux';

import {actions as stateActions} from '../redux/ducks/state';
import CheckoutHeader from '../sections/checkoutHeader';
import DashboardHeader from '../components/dashboardHeader';
import {selectors as userSelectors} from '../redux/ducks/user';
import BaseLayout from './base';
import CopyrightFooter from '../sections/copyrightFooter';
import Loader from '../components/loader';
import {getTimeOfDay} from '../utils/componentHelpers';

class DashboardLayout extends Component {
  componentDidMount() {
    this.props.actions.setProductSort({
      key: 'percentage_completed',
      order: 'DESC'
    });
  }

  render() {
    const {children, title, activeLink, user, showWelcome, sidebar: Sidebar, loading} = this.props;

    return (
      <BaseLayout header={CheckoutHeader} footer={CopyrightFooter} mainClass="layout-dashboard" hideModals={['mobileMenu']}>
        {/* @TODO: Show alert if the user is enrolled, but all enrollments are expired */}
        <div className="layout-dashboard__wrap">
          <DashboardHeader
            welcome={showWelcome && isImmutable(user) ? `Good ${getTimeOfDay()}, ${user.get('first_name')}` : null}
            title={title}
            activeLink={activeLink}
          />
          <div className="container">
            <div className={['layout-dashboard__container', Sidebar ? 'has-sidebar' : ''].join(' ')}>
              {Sidebar ? (
                <aside className="layout-dashboard__sidebar">
                  <Sidebar />
                </aside>
              ) : null}
              <div className="layout-dashboard__content">{loading ? <Loader width={100} height={100} loading={loading} position="top-center" /> : children}</div>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  title: PropTypes.string.isRequired,
  activeLink: PropTypes.number.isRequired,
  user: ImmutablePropTypes.map,
  showWelcome: PropTypes.bool,
  loading: PropTypes.bool,
  sidebar: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

DashboardLayout.defaultProps = {
  showWelcome: false,
  sidebar: null,
  loading: false
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
