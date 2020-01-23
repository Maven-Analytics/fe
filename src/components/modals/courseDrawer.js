import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {fromJS} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import imageFragment from '#root/api/fragments/image';
import CloseButton from '#root/components/closeButton';
import CourseLessons from '#root/components/courseLessons';
import ProductDetail from '#root/components/productDetail';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {clickAction} from '#root/utils/componentHelpers';

import Markdown from '../markdown';

const courseQuery = gql`
query CourseById($id: String!) {
  courses(id: $id) {
    author {
      name
      thumbnail {
        ...image
      }
    }
    cardDescription
    badge {
      ...image
    }
    description
    descriptionFull
    descriptionDetail
    descriptionDetails
    enrollment {
      id
      percentage_completed
    }
    hours
    id
    length
    lessons {
      lessons
      title
    }
    match
    slug
    thinkificCourseId
    thumbnail {
      ...image
    }
    title
    tools
    url
  }
}
${imageFragment}
`;

const CourseDrawer = ({actions, state}) => {
  const isOpen = state.getIn(['courseDrawer', 'open']);
  // Const course = courses.find(course => course.get('id') === state.getIn(['courseDrawer', 'data']));

  const classList = ['course-drawer'];
  const close = clickAction(actions.modalClose, 'courseDrawer');
  let course = null;

  if (isOpen) {
    classList.push('open');
  }

  if (isOpen) {
    const {data: {courses = []} = {}} = useQuery(courseQuery, {
      variables: {
        id: state.getIn(['courseDrawer', 'data'])
      }
    });

    course = fromJS(courses[0]);

    console.log(course);
  }

  return (
    <div className={classList.join(' ')} tabIndex={isOpen ? 0 : -1}>
      <div onClick={close} className="course-drawer__fog" />
      <div className="course-drawer__inner">
        <CloseButton onClick={close} />
        <div className="course-drawer__content">
          {course ? (
            <ProductDetail
              productTerm="Course"
              className="product-detail--course"
              comingSoon={course.get('comingSoon')}
              badge={course.get('badge')}
              title={course.get('title')}
              percentage_completed={course.get('percentage_completed') || course.getIn(['enrollment', 'percentage_completed'])}
              titleTag="h2"
              match={course.get('match')}
              resumeUrl={course.get('url')}
              tools={course.get('tools')}
              hours={course.get('length')}
              instructors={course.get('author')}
              id={course.get('thinkificCourseId')}
              url={Routes.Course(course.get('slug'))}
            >
              {course.get('descriptionFull') && course.get('descriptionFull') !== '' ? <Markdown content={course.get('descriptionFull')} /> : null}
              {course.get('lessons') ? <CourseLessons lessons={course.get('lessons')} /> : null}
              {course.get('descriptionDetail') ? <Markdown content={course.get('descriptionDetail')} /> : null}
            </ProductDetail>
          ) : null}
        </div>
      </div>
    </div>
  );
};

CourseDrawer.propTypes = {
  state: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state)
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
)(CourseDrawer);
