import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {isCollapseDown} from '#root/components/mediaQuery';
import CourseDetail from '#root/components/shared/CourseDetail';
import PathDetail from '#root/components/shared/PathDetail';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';

import AssessmentModal from './AssessmentModal';
import MissionItemModal from './MissionItemModal';
import MobileNav from './MobileNav';
import PageModal from './PageModal';
import ProductDrawer from './ProductDrawer';
import VideoModal from './VideoModal';

const Modals = () => {
  const dispatch = useDispatch();
  const state = useSelector(stateSelectors.getState);

  return (
    <>
      <MobileNav
        open={state.get('mobileMenu')}
        onClose={() => dispatch(stateActions.offmenuToggle('mobileMenu'))}
      />
      <ProductDrawer
        open={state.getIn(['courseDrawer', 'open'])}
        onClose={() => dispatch(stateActions.offmenuToggle('courseDrawer'))}
      >
        <CourseDetail
          courseId={state.getIn(['courseDrawer', 'data'])}
          onResumeClick={() => dispatch(stateActions.modalClose('courseDrawer'))}
        />
      </ProductDrawer>
      <ProductDrawer
        open={state.getIn(['pathDrawer', 'open'])}
        onClose={() => dispatch(stateActions.modalClose('pathDrawer'))}
      >
        <PathDetail
          pathId={state.getIn(['pathDrawer', 'data'])}
          onResumeClick={() => dispatch(stateActions.modalClose('pathDrawer'))}
        />
      </ProductDrawer>
      <VideoModal
        open={state.getIn(['video', 'open'])}
        video={state.getIn(['video', 'data', 'video'])}
        onClose={() => dispatch(stateActions.modalClose('video'))}
      />
      <AssessmentModal
        open={state.getIn(['assessment', 'open'])}
        id={state.getIn(['assessment', 'data', 'id'])}
        onClose={() => dispatch(stateActions.modalClose('assessment'))}
      />
      <MissionItemModal
        open={isCollapseDown() && state.getIn(['missionItem', 'open'])}
        data={state.getIn(['missionItem', 'data'])}
        onClose={() => dispatch(stateActions.modalClose('missionItem'))}
      />
      <PageModal
        open={state.getIn(['pageModal', 'open'])}
        slug={state.getIn(['pageModal', 'data'])}
        onClose={() => dispatch(stateActions.modalClose('pageModal'))}
      />
    </>
  );
};

export default Modals;
