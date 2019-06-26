import {takeLatest, put, select, all} from 'redux-saga/effects';
import axios from 'axios';

import {types as surveyResultTypes, selectors as surveyResultsSelectors} from '../ducks/surveyResult';
import {setCookie, getCookie} from '../../utils/cookies';
import config from '../../config';

export function * watchSurveys() {
  yield takeLatest(surveyResultTypes.SURVEY_RESULT_UPDATE, onServeyResultUpdate);
}

function * onServeyResultUpdate({ctx}) {
  try {
    const surveyResults = yield select(surveyResultsSelectors.getSurveyResult);

    // yield saveSurvey(surveyResults.toJS(), ctx);

    // setCookie('surveyResult', surveyResults);
  } catch (error) {
    console.log(error);
  }
}
