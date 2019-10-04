import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions, selectors as stateSelectors} from '../redux/ducks/state';
import {selectors as dashboardSelectors} from '../redux/ducks/dashboard';
import {selectors as userSelectors} from '../redux/ducks/user';
import CloseButton from '../components/closeButton';
import ProductDetail from '../components/productDetail';
import RichText from '../components/richText';
import {clickAction} from '../utils/componentHelpers';
import {getLatestCourse, getPathHours, getPathInstructors, getMatchForPath} from '../utils/pathHelpers';
import {getResumeCourseUrl} from '../utils/routeHelpers';

const PathDrawer = ({actions, state, enrollments, user}) => {
  const isOpen = state.getIn(['pathDrawer', 'open']);
  const path = state.getIn(['pathDrawer', 'data']);

  const classList = ['path-drawer'];
  const close = clickAction(actions.modalClose, 'pathDrawer');

  if (isOpen) {
    classList.push('open');
  }

  return (
    <div className={classList.join(' ')} tabIndex={isOpen ? 0 : -1}>
      <div onClick={close} className="path-drawer__fog" />
      <div className="path-drawer__inner">
        <CloseButton onClick={close} />
        <div className="path-drawer__content">
          {path ? (
            <ProductDetail
              productTerm="Path"
              badge={path.get('badge')}
              title={path.get('title')}
              titleTag="h2"
              percentage_completed={path.get('percentage_completed')}
              resumeUrl={getLatestCourse(path, enrollments).get('url')}
              tools={path.get('tools')}
              match={getMatchForPath(path, user)}
              courseCount={path.get('courses').count()}
              hours={getPathHours(path)}
              instructors={getPathInstructors(path)}
            >
              {path.get('description') && path.get('description') !== '' ? <RichText content={path.get('description')} /> : null}
            </ProductDetail>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PathDrawer.propTypes = {
  state: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  enrollments: ImmutablePropTypes.list,
  user: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state),
  enrollments: dashboardSelectors.getEnrollments(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...stateActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathDrawer);
