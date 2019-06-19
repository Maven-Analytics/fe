import {takeLatest, put, select, all} from 'redux-saga/effects';

import {types as surveyResultTypes, selectors as surveyResultsSelectors} from '../ducks/surveyResult';
import {setCookie} from '../../utils/cookies';

export function * watchSurveys() {
  yield takeLatest(surveyResultTypes.SURVEY_RESULT_UPDATE, onServeyResultUpdate);
}

function * onServeyResultUpdate() {
  try {
    const surveyResults = yield select(surveyResultsSelectors.getSurveyResult);

    setCookie('surveyResult', surveyResults);
  } catch (error) {
    console.log(error);
  }
}
