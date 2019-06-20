import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import GlobalHeader from '../sections/globalHeader';
import MobileMenu from '../components/mobileMenu';
import GlobalFooter from '../sections/globalFooter';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as stateSelectors, actions as stateActions} from '../redux/ducks/state';
import {click} from '../utils/componentHelpers';

const MainLayout = ({children, actions, state}) => {
  return (
    <Fragment>
      <GlobalHeader state={state} offmenuToggle={actions.offmenuToggle}/>
      <MobileMenu isActive={state.get('mobileMenu')} offmenuToggle={actions.offmenuToggle}/>
      <main id="main" className="page-wrapper" onClick={click(actions.stateReset)}>
        {children}
      </main>
      <GlobalFooter description="Award-winning courses to help you master the most sought-after analytics and business intelligence skills.  Customized training that helps everyday people become data rockstars. "/>
    </Fragment>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  state: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

