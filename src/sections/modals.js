import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions, selectors as stateSelectors} from '../redux/ducks/state';

import MobileMenu from '../modals/mobileMenu';
import PathDrawer from '../modals/pathDrawer';

const Modals = ({state, actions, hideModals}) => {
  return (
    <Fragment>
      {hideModals.indexOf('mobileMenu') === -1 ? (
        <MobileMenu
          isActive={state.get('mobileMenu')}
          offmenuToggle={actions.offmenuToggle}
        />
      ) : null}
      <PathDrawer/>
    </Fragment>
  );
};

Modals.propTypes = {
  state: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  hideModals: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
