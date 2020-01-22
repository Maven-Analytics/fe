import Router from 'next/router';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {isCollapseDown} from '#root/components/mediaQuery';
import withWindowSize from '#root/components/withWindowSize';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';
import {click} from '#root/utils/componentHelpers';

import AssessmentModal from './assessmentModal';
import CourseDrawer from './courseDrawer';
import MissionItemModal from './missionItemModal';
import MobileMenu from './mobileMenu';
import PageModal from './pageModal';
import PathDrawer from './pathDrawer';
import VideoModal from './videoModal';

const ModalController = ({state, actions, hideModals, loginRedirect}) => {
  // DON'T DO THIS!!!!!
  // Router.events.on('routeChangeComplete', () => {
  //   actions.stateReset();
  // });

  return (
    <Fragment>
      {hideModals.indexOf('mobileMenu') === -1 ? (
        <MobileMenu
          isActive={state.get('mobileMenu')}
          offmenuToggle={actions.offmenuToggle}
          loginRedirect={loginRedirect}
        />
      ) : null}
      <PathDrawer/>
      <CourseDrawer/>
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
