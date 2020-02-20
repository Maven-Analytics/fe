import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {click, clickAction} from '#root/utils/componentHelpers';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';

import CloseButton from '#root/components/closeButton';
import CourseLessons from '#root/components/courseLessons';
import Markdown from '../markdown';
import ProductDetail from '#root/components/productDetail';
import PropTypes from 'prop-types';
import React from 'react';
import {Routes} from '#root/routes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import gql from 'graphql-tag';
import imageFragment from '#root/api/fragments/image';
import {useQuery} from '@apollo/react-hooks';

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
      comingSoon
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
  const close = click(actions.modalClose, 'courseDrawer');
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
              percentage_completed={
                course.get('percentage_completed') || course.getIn(['enrollment', 'percentage_completed'])
              }
              titleTag="h2"
              match={course.get('match')}
              resumeUrl={course.get('url')}
              onResumeClick={close}
              tools={course.get('tools')}
              hours={course.get('length')}
              instructors={course.get('author')}
              id={course.get('thinkificCourseId')}
              url={Routes.Course(course.get('slug'))}
            >
              {course.get('descriptionFull') && course.get('descriptionFull') !== '' ? (
                <Markdown content={course.get('descriptionFull')} />
              ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseDrawer);
