import {all, fork} from 'redux-saga/effects';

import {watchAnnouncements} from './announcements';
import {watchAuth} from './auth';
import {watchCheckout} from './checkout';
import {watchContact} from './contact';
import {watchCourses} from './courses';
import {watchCredentials} from './credentials';
import {watchDashboard} from './dashboard';
import {watchEnrollments} from './enrollments';
import {watchFilters} from './filter';
import {watchPages} from './pages';
import {watchPaths} from './paths';
import {watchProfile} from './profile';
import {watchRecommended} from './recommended';
import {watchScores} from './scores';
import {watchSpotlights} from './spotlights';
import {watchState} from './state';
import {watchSubscribe} from './subscribe';
import {watchSubscription} from './subscription';
import {watchUserSettings} from './userSettings';

function * rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchState),
    fork(watchCheckout),
    fork(watchPaths),
    fork(watchCourses),
    fork(watchProfile),
    fork(watchDashboard),
    fork(watchFilters),
    fork(watchScores),
    fork(watchSpotlights),
    fork(watchPages),
    fork(watchContact),
    fork(watchSubscribe),
    fork(watchCredentials),
    fork(watchAnnouncements),
    fork(watchUserSettings),
    fork(watchEnrollments),
    fork(watchRecommended),
    fork(watchSubscription)
  ]);
}

export default rootSaga;
