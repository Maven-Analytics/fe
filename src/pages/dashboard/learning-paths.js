import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as dashboardActions, selectors as dashboardSelectors} from '../../redux/ducks/dashboard';
import {actions as pathActions} from '../../redux/ducks/paths';
import {actions as courseActions} from '../../redux/ducks/courses';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as userSelectors} from '../../redux/ducks/user';
import {actions as stateActions} from '../../redux/ducks/state';
import DashboardLayout from '../../layouts/dashboard';
import DashboardCard from '../../components/dashboardCard';
import DashboardPath from '../../components/dashboardPath';
import DashboardGrid from '../../components/dashboardGrid';
import {prettyPercent, clickAction} from '../../utils/componentHelpers';
import {getMatchForPath, getLastestCourseSlugResumeCourseUrl} from '../../utils/pathHelpers';
import {getResumeCourseUrl} from '../../utils/routeHelpers';
import withAuthSync from '../../components/withAuthSync';

class DashboardLearningPaths extends Component {
  componentDidMount() {
    this.props.actions.pathsInit();
    this.props.actions.coursesInit();
    this.props.actions.getProgress();
  }

  render() {
    const {progress, loadingProgress, user, enrollments, actions} = this.props;

    return (
      <DashboardLayout showWelcome loading={loadingProgress} title="Learning Paths" activeLink={1}>
        <DashboardGrid vertical>
          {progress.get('paths').map(path => (
            <DashboardCard key={path.get('pathId')} size="xl" style={{margin: 0}}>
              <DashboardPath
                title={path.getIn(['title'])}
                badge={path.getIn(['badge'])}
                shortDescription={path.getIn(['shortDescription'])}
                resumeUrl={getResumeCourseUrl(getLastestCourseSlugResumeCourseUrl(path, enrollments))}
                percentage_completed={path.get('percentage_completed')}
                match={`${prettyPercent(getMatchForPath(path, user))}%`}
                courseCount={path.getIn(['courses']).count()}
                tools={path.getIn(['tools'])}
                onDetailClick={clickAction(actions.modalOpen, 'pathDrawer', path)}
              />
            </DashboardCard>
          ))}
        </DashboardGrid>
      </DashboardLayout>
    );
  }
}

DashboardLearningPaths.getInitialProps = async ctx => {
  const {store} = ctx;
  // store.dispatch(pathActions.pathsInit());
  // store.dispatch(courseActions.coursesInit());
};

DashboardLearningPaths.propTypes = {
  loadingProgress: PropTypes.bool,
  errorProgress: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  progress: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
  enrollments: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  progress: dashboardSelectors.getProgress(state),
  loadingProgress: loadingSelectors.getLoading(['DASHBOARD_PROGRESS'])(state),
  errorProgress: errorSelectors.getError(['DASHBOARD_PROGRESS'])(state),
  user: userSelectors.getUser(state),
  enrollments: dashboardSelectors.getEnrollments(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...dashboardActions,
      ...stateActions,
      ...pathActions,
      ...courseActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(DashboardLearningPaths));
