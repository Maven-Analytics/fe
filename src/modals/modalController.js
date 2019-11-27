import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions, selectors as stateSelectors} from '../redux/ducks/state';

import MobileMenu from './mobileMenu';
import PathDrawer from './pathDrawer';
import CourseDrawer from './courseDrawer';
import VideoModal from './videoModal';
import AssessmentModal from './assessmentModal';
import {click} from '../utils/componentHelpers';
import MissionItemModal from './missionItemModal';
import {isCollapseDown} from '../components/mediaQuery';
import withWindowSize from '../components/withWindowSize';
import PageModal from './pageModal';

const ModalController = ({state, actions, hideModals, loginRedirect}) => {
  return (
    <Fragment>
      {hideModals.indexOf('mobileMenu') === -1 ? (
        <MobileMenu
          isActive={state.get('mobileMenu')}
          offmenuToggle={actions.offmenuToggle}
          loginRedirect={loginRedirect}
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
      <PageModal
        open={state.getIn(['pageModal', 'open'])}
        slug={state.getIn(['pageModal', 'data'])}
        onClose={click(actions.modalClose, 'pageModal')}
      />
    </Fragment>
  );
};

ModalController.propTypes = {
  state: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  hideModals: PropTypes.array.isRequired,
  loginRedirect: PropTypes.string
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withWindowSize(ModalController));
