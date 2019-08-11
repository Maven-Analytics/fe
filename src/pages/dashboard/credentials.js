import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DashboardLayout from '../../layouts/dashboard';
import {actions as pathActions, selectors as pathSelectors} from '../../redux/ducks/paths';
import {actions as courseActions, selectors as courseSelectors} from '../../redux/ducks/courses';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import DashboardCredentialList from '../../components/dashboardCredentialList';
import CredentialCard from '../../components/credentialCard';
import withAuthSync from '../../components/withAuthSync';

class DashboardCredentials extends Component {
  componentDidMount() {
    this.props.actions.pathsInit();
    this.props.actions.coursesInit();
  }

  render() {
    const {paths, courses, loadingPaths, loadingCourses} = this.props;

    return (
      <DashboardLayout showWelcome loading={false} title="Credentials & Badges" activeLink={3}>
        <DashboardCredentialList title="Learning Paths" loading={loadingPaths}>
          {paths.map(path => {
            return (
              <CredentialCard
                completed={path.get('completed')}
                promoteUrl="/"
                key={path.get('id')}
                title={path.get('title')}
                progress={path.get('percentage_completed')}
                image={path.get('badge')}
              />
            );
          })}
        </DashboardCredentialList>
        <DashboardCredentialList title="Courses" loading={loadingCourses}>
          {courses.map(course => {
            return (
              <CredentialCard
                completed={course.get('completed')}
                promoteUrl="/"
                key={course.get('id')}
                title={course.get('title')}
                progress={course.get('percentage_completed')}
                image={course.get('badge')}
              />
            );
          })}
        </DashboardCredentialList>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => ({
  paths: pathSelectors.getPathsByCompletionDesc(state),
  courses: courseSelectors.getCoursesByCompletionDesc(state),
  loadingCourses: loadingSelectors.getLoading(['COURSESINIT'])(state),
  errorCourses: errorSelectors.getError(['COURSESINIT'])(state),
  loadingPaths: loadingSelectors.getLoading(['PATHSINIT'])(state),
  errorPaths: errorSelectors.getError(['PATHSINIT'])(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...pathActions,
      ...courseActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(DashboardCredentials));
