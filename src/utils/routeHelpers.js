import {Routes} from '../routes';

export const getResumeCourseUrl = slug => {
  return `${Routes.CourseTake}/${slug}`;
};
