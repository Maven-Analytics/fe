import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Main from './main';
import CtaSection from '../sections/ctaSection';

class BrochureLayout extends Component {
  render() {
    const {children, className} = this.props;

    const classList = ['brochure-layout'];

    if (className) {
      classList.push(className);
    }

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
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BrochureLayout;
