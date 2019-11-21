import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions, selectors as stateSelectors} from '../redux/ducks/state';

import MobileMenu from '../modals/mobileMenu';
import PathDrawer from '../modals/pathDrawer';
import CourseDrawer from '../modals/courseDrawer';
import VideoModal from '../modals/videoModal';
import AssessmentModal from '../modals/assessmentModal';
import {click} from '../utils/componentHelpers';
import MissionItemModal from '../modals/missionItemModal';
import {isCollapseDown} from '../components/mediaQuery';
import withWindowSize from '../components/withWindowSize';

const Modals = ({state, actions, hideModals}) => {
  return (
    <Fragment>
      {hideModals.indexOf('mobileMenu') === -1 ? (
        <MobileMenu
          isActive={state.get('mobileMenu')}
          offmenuToggle={actions.offmenuToggle}
        />
      ) : null}
      <PathDrawer />
      <CourseDrawer />
      <VideoModal
        open={state.getIn(['video', 'open'])}
        video={state.getIn(['video', 'data', 'video'])}
        onClose={click(actions.modalClose, 'video')}
      />
      <AssessmentModal
        open={state.getIn(['assessment', 'open'])}
        id={state.getIn(['assessment', 'data', 'id'])}
        onClose={click(actions.modalClose, 'assessment')}
      />
      <MissionItemModal
        open={isCollapseDown() && state.getIn(['missionItem', 'open'])}
        data={state.getIn(['missionItem', 'data'])}
        onClose={click(actions.modalClose, 'missionItem')}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(withWindowSize(Modals));
