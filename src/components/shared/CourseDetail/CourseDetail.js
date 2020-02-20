import CourseLessons from '#root/components/courseLessons';
import Markdown from '#root/components/markdown';
import ProductDetail from '#root/components/productDetail';
import PropTypes from 'prop-types';
import React from 'react';
import {Routes} from '#root/routes';
import {fromJS} from 'immutable';
import gql from 'graphql-tag';
import imageFragment from '#root/api/fragments/image';
import {noop} from '#root/utils/componentHelpers';
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

const CourseDetail = ({courseId, onResumeClick: handleResumeClick}) => {
  if (!courseId) {
    return null;
  }

  const {data: {courses = []} = {}} = useQuery(courseQuery, {
    variables: {
      id: courseId
    }
  });

  if (!courses.length) {
    return null;
  }

  const course = fromJS(courses[0]);

  return (
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
      onResumeClick={handleResumeClick}
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
  );
};

CourseDetail.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onResumeClick: PropTypes.func
};

CourseDetail.defaultProps = {
  onResumeClick: noop
};

export default CourseDetail;
