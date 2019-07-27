import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import {actions as stateActions} from '../redux/ducks/state';
import MainLayout from '../layouts/main';
import {redirect} from '../utils/routingHelpers';
import {Routes} from '../routes';
import CourseHero from '../components/courseHero';
import {clickAction} from '../utils/componentHelpers';

const Course = ({course, actions}) => {
  return (
    <MainLayout>
      <div className="course-detail">
        <CourseHero
          title={course.get('title')}
          description={course.get('previewDescription')}
          hours={course.get('length')}
          difficulty={course.get('difficulty')}
          tools={course.get('tools')}
          skills={course.get('skills')}
          badge={course.get('badge')}
          paths={course.get('paths')}
          thumbnail={course.get('thumbnail')}
          video="video"
          onVideoClick={clickAction(actions.modalOpen, 'video', course.get('video'))}
        />
      </div>
    </MainLayout>
  );
};

Course.getInitialProps = ctx => {
  const {res, query, store} = ctx;

  if (!query.id) {
    return redirect(Routes.Home, res);
  }

  store.dispatch(courseActions.coursesGet({params: {'fields.slug': query.id}}));

  return {
    slug: query.id
  };
};

Course.propTypes = {
  course: ImmutablePropTypes.map.isRequired,
  slug: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

Course.defaultProps = {
  course: Map()
};

const mapStateToProps = (state, ownProps) => ({
  course: courseSelectors.getCourse(state, ownProps.slug)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
