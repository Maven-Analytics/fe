import {combineReducers} from 'redux-immutable';

import activeFilters from './activeFilters';
import announcements from './announcements';
import checkout from './checkout';
import courses from './courses';
import credentials from './credentials';
import dashboard from './dashboard';
import enrollments from './enrollments';
import error from './error';
import filters from './filters';
import loading from './loading';
import pages from './pages';
import paths from './paths';
import plans from './plans';
import recommended from './recommended';
import response from './response';
import scores from './scores';
import spotlights from './spotlights';
import state from './state';
import subscription from './subscription';
import surveyResult from './surveyResult';
import user from './user';
import userSettings from './userSettings';

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
  // Spotlights,
  pages,
  credentials,
  announcements,
  userSettings,
  enrollments,
  recommended,
  subscription
});

export default Ducks;
