import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import {SurveyQuestions} from '../../surveyContstants';
import * as utils from '../../utils/duckHelpers';
import {getAdjustedCoursePercentages, getAdjustedPathPercentages, getCoursePercentages, getInitialAnswers, getPathPercentages, getRecommendedCourses, getRecommendedPaths, getSurveyWeights, sortResults} from '../../utils/surveyHelpers';
import {selectors as courseSelectors} from './courses';
import {selectors as pathSelectors} from './paths';
import {selectors as userSelectors} from './user';

export const types = {
  SURVEY_RESULT_UPDATE: 'SURVEY_RESULT_UPDATE'
};

export const actions = {
  surveyResultUpdate: obj => utils.action(types.SURVEY_RESULT_UPDATE, obj)
};

// @DEV
// import {DEV_SURVEY_RESULTS} from '../../surveyContstants';
// const initialState = utils.initialState(DEV_SURVEY_RESULTS);
const initialState = utils.initialState(getInitialAnswers(SurveyQuestions, 5));

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SURVEY_RESULT_UPDATE:
    return state.merge(fromJS(action.payload));
  default:
    return state;
  }
};

const getSurveyResult = state => state.get('surveyResult');

export const selectors = {
  getSurveyResult: createSelector([getSurveyResult], p => p),
  getRecommendedCourses: createSelector([getSurveyResult, courseSelectors.getCourses], (results, courses) => {
    const recommended = getRecommendedCourses(results);
    const percentages = getCoursePercentages(recommended, getSurveyWeights(courses));
    const adjustedPercentages = getAdjustedCoursePercentages(recommended);
    const sorted = sortResults(percentages);

    return sorted.map(id => {
      return fromJS({
        id: id,
        percentage: percentages.get(id),
        adjustedPercentage: adjustedPercentages.get(id)
      });
    });
  }),
  getRecommendedPaths: createSelector([getSurveyResult, pathSelectors.getPaths], (results, paths) => {
    const recommended = getRecommendedPaths(results);
    const percentages = getPathPercentages(recommended, getSurveyWeights(paths));
    const adjustedPercentages = getAdjustedPathPercentages(recommended);
    const sorted = sortResults(percentages);

    return sorted.map(id => {
      return fromJS({
        id: id,
        percentage: percentages.get(id),
        adjustedPercentage: adjustedPercentages.get(id)
      });
    });
  })
};
