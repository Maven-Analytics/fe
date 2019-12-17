import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DashboardLayout from '../../layouts/dashboard';
import {actions as pathActions, selectors as pathSelectors} from '../../redux/ducks/paths';
import {actions as courseActions, selectors as courseSelectors} from '../../redux/ducks/courses';
import {actions as credentialsActions} from '../../redux/ducks/credentials';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import DashboardCredentialList from '../../components/dashboardCredentialList';
import CredentialCard from '../../components/credentialCard';
import withAuthSync from '../../components/withAuthSync';

class DashboardCredentials extends Component {
  componentDidMount() {
    this.props.actions.pathsGet();
    this.props.actions.coursesInit();
    this.props.actions.credentialsGet();
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
                promoteUrl={path.get('badgeUrl')}
                key={path.get('id')}
                title={path.get('title')}
                progress={path.get('percentage_completed')}
                image={path.get('badge')}
                accredibleId={path.get('accredibleId')}
              />
            );
          })}
        </DashboardCredentialList>
        <DashboardCredentialList title="Courses" loading={loadingCourses}>
          {courses.map(course => {
            return (
              <CredentialCard
                completed={course.get('completed')}
                promoteUrl={course.get('badgeUrl')}
                key={course.get('id')}
                title={course.get('title')}
                progress={course.get('percentage_completed')}
                image={course.get('badge')}
                accredibleId={course.get('accredibleId')}
              />
            );
          })}
        </DashboardCredentialList>
      </DashboardLayout>
    );
  }
}

DashboardCredentials.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  paths: ImmutablePropTypes.list,
  loadingCourses: PropTypes.bool,
  loadingPaths: PropTypes.bool,
  courses: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  paths: pathSelectors.getPaths(state),
  courses: courseSelectors.getCourses(state),
  loadingCourses: loadingSelectors.getLoading(['COURSESINIT'])(state),
  errorCourses: errorSelectors.getError(['COURSESINIT'])(state),
  loadingPaths: loadingSelectors.getLoading(['PATHS_GET'])(state),
  errorPaths: errorSelectors.getError(['PATHS_GET'])(state)
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...pathActions,
        ...courseActions,
        ...credentialsActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthSync(DashboardCredentials));
