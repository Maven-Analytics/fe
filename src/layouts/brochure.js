import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Main from './main';
import CtaSection from '../sections/ctaSection';

class BrochureLayout extends Component {
  render() {
    const {children} = this.props;

    return (
      <Main>
        <div className="layout-brochure">
          {children}
          <CtaSection/>
        </div>
      </Main>
    );
  }
}

BrochureLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default BrochureLayout;
