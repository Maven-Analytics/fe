import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import PageLayout from '../layouts/page';
import {redirect} from '../utils/routingHelpers';
import {Routes} from '../routes';

const Course = ({course}) => {
  return (
    <PageLayout>
      <h1>{course.get('title')}</h1>
    </PageLayout>
  );
};

Course.getInitialProps = ctx => {
  const {res, query, store} = ctx;

  if (!query.id) {
    return redirect(Routes.Home, res);
  }

  store.dispatch(courseActions.coursesInit({query: {'fields.slug': query.id}}));

  return {
    slug: query.id
  };
};

Course.propTypes = {
  course: ImmutablePropTypes.map.isRequired,
  slug: PropTypes.string.isRequired
};

Course.defaultProps = {
  course: Map()
};

const mapStateToProps = (state, ownProps) => ({
  course: courseSelectors.getCourse(state, ownProps.slug)
});

export default connect(mapStateToProps)(Course);