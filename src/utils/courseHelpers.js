import {Map} from 'immutable';

export const getCourseById = (courses, id) => courses && courses.find && (courses.find(c => c.get('id') === id) || Map());

export const getCourseBySlug = (courses, slug) => courses && courses.find && courses.find(c => c && c.get && c.get('slug') === slug);
