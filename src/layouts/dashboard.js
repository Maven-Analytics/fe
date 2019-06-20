import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Router from 'next/router';
import {connect} from 'react-redux';

import Main from './main';
import {selectors as userSelectors} from '../redux/ducks/user';
import withAuthSync from '../components/withAuthSync';

class DashboardLayout extends Component {
  render() {
    const {children} = this.props;

    return (
      <Main>
        <div className="layout-dashboard">
          <div className="container">
            <div className="layout-dashboard__wrap">
              {children}
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default withAuthSync(DashboardLayout);
