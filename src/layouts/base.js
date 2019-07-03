import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Modals from '../sections/modals';
import {click} from '../utils/componentHelpers';
import {selectors as stateSelectors, actions as stateActions} from '../redux/ducks/state';

const BaseLayout = ({children, header: Header, footer: Footer, mainClass, actions, hideModals}) => {
  return (
    <Fragment>
      {Header ? <Header/> : null}
      <main id="main" className={mainClass} onClick={click(actions.stateReset)}>
        {children}
      </main>
      <Modals hideModals={hideModals}/>
      {Footer ? <Footer/> : null}
    </Fragment>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.any,
  footer: PropTypes.any,
  mainClass: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  hideModals: PropTypes.array
};

BaseLayout.defaultProps = {
  hideModals: []
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
