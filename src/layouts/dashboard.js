import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {isImmutable} from 'immutable';

import withAuthSync from '../components/withAuthSync';
import CheckoutHeader from '../sections/checkoutHeader';
import DashboardHeader from '../components/dashboardHeader';
import {selectors as userSelectors} from '../redux/ducks/user';
import BaseLayout from './base';
import CopyrightFooter from '../sections/copyrightFooter';

const DashboardLayout = ({children, title, activeLink, user, showWelcome, sidebar: Sidebar}) => {
  return (
    <BaseLayout
      header={CheckoutHeader}
      footer={CopyrightFooter}
      mainClass="layout-dashboard"
      hideModals={['mobileMenu']}
    >
      <div className="layout-dashboard__wrap">
        <DashboardHeader
          welcome={showWelcome && isImmutable(user) ? `Good afternoon, ${user.get('first_name')}` : null}
          title={title}
          activeLink={activeLink}
        />
        <div className="container">
          <div className={['layout-dashboard__container', Sidebar ? 'has-sidebar' : ''].join(' ')}>
            {Sidebar ? (
              <aside className="layout-dashboard__sidebar">
                <Sidebar/>
              </aside>
            ) : null}
            <div className="layout-dashboard__content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  title: PropTypes.string.isRequired,
  activeLink: PropTypes.number.isRequired,
  user: ImmutablePropTypes.map,
  showWelcome: PropTypes.bool,
  sidebar: PropTypes.func
};

DashboardLayout.defaultProps = {
  showWelcome: false,
  sidebar: null
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(withAuthSync(DashboardLayout));
