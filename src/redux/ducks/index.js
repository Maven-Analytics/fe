import {combineReducers} from 'redux-immutable';

import loading from './loading';
import error from './error';
import response from './response';
import user from './user';
import state from './state';
import plans from './plans';
import checkout from './checkout';
import paths from './paths';
import courses from './courses';
import surveyResult from './surveyResult';
import dashboard from './dashboard';
import filters from './filters';
import activeFilters from './activeFilters';
import scores from './scores';
import spotlights from './spotlights';
import pages from './pages';
import credentials from './credentials';
import announcements from './announcements';
import userSettings from './userSettings';
import enrollments from './enrollments';

const Ducks = combineReducers({
  loading,
  error,
  response,
  user,
  state,
  plans,
  checkout,
  paths,
  courses,
  surveyResult,
  dashboard,
  filters,
  activeFilters,
  scores,
  spotlights,
  pages,
  credentials,
  announcements,
  userSettings,
  enrollments
});

export default Ducks;
