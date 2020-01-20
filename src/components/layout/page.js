import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Main from './main';

class DashboardLayout extends Component {
  render() {
    const {children} = this.props;

    return (
      <Main>
        <div className="layout-page">
          <div className="container container--lg">
            <div className="layout-page__wrap">
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

export default DashboardLayout;
