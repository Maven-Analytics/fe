import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';

import {actions as pathActions, selectors as pathSelectors} from '../redux/ducks/paths';
import {selectors as dashboardSelectors} from '../redux/ducks/dashboard';
import PageLayout from '../layouts/page';
import PathDetail from '../components/pathDetail';
import {redirect} from '../utils/routingHelpers';
import {Routes} from '../routes';
import {getResumeCourseUrl, getPathHours, getPathInstructors} from '../utils/pathHelpers';

const Path = ({path, enrollments}) => {
  return (
    <PageLayout>
      <PathDetail
        badge={path.get('badge')}
        title={path.get('title')}
        titleTag="h1"
        resumeUrl={getResumeCourseUrl(path, enrollments)}
        description={path.get('description')}
        tools={path.get('tools')}
        courseCount={path.get('courses').count()}
        hours={getPathHours(path)}
        instructors={getPathInstructors(path)}
      />
    </PageLayout>
  );
};

Path.getInitialProps = ctx => {
  const {res, query, store} = ctx;

  if (!query.id) {
    return redirect(Routes.Home, res);
  }

  store.dispatch(pathActions.pathsInit({query: {'fields.slug': query.id}}));

  return {
    slug: query.id
  };
};

Path.propTypes = {
  path: ImmutablePropTypes.map.isRequired,
  slug: PropTypes.string.isRequired,
  enrollments: ImmutablePropTypes.list
};

Path.defaultProps = {
  path: Map(),
  enrollments: List()
};

const mapStateToProps = (state, ownProps) => ({
  path: pathSelectors.getPath(state, ownProps.slug),
  enrollments: dashboardSelectors.getEnrollments(state)
});

export default connect(mapStateToProps)(Path);
