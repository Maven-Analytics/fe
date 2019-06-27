import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import withAuthSync from '../components/withAuthSync';
import {click} from '../utils/componentHelpers';
import CheckoutHeader from '../sections/checkoutHeader';
import Copyright from '../sections/copyright';
import DashboardHeader from '../components/dashboardHeader';
import {actions as stateActions} from '../redux/ducks/state';

class DashboardLayout extends Component {
  render() {
    const {children, actions, title, activeLink} = this.props;

    return (
      <Fragment>
        <CheckoutHeader/>
        <main id="main" className="layout-dashboard" onClick={click(actions.stateReset)}>
          <div className="layout-dashboard__wrap">
            <DashboardHeader title={title} activeLink={activeLink}/>
            <div className="container">
              <div className="layout-dashboard__content">
                {children}
              </div>
            </div>
          </div>
        </main>
        <footer>
          <Copyright/>
        </footer>
      </Fragment>
    );
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  title: PropTypes.string.isRequired,
  activeLink: PropTypes.number.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(DashboardLayout));
