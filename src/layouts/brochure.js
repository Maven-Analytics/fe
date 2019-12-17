import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions} from '../redux/ducks/state';
import Main from './main';
import CtaSection from '../sections/ctaSection';

class BrochureLayout extends Component {
  componentDidMount() {
    this.props.actions.resetProductSort();
  }

  render() {
    const {children, className} = this.props;

    const classList = ['brochure-layout'];

    if (className) {
      classList.push(className);
    }

    return (
      <Main className={className}>
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
  className: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func)
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BrochureLayout);
