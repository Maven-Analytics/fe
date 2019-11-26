import {call} from 'redux-saga/effects';

export function * checkRedirect(payload) {
  const {redirectTo} = payload;

  let url = null;

  if (redirectTo && typeof redirectTo === 'function') {
    url = yield call(redirectTo);
  } else if (redirectTo && typeof redirectTo === 'string') {
    url = redirectTo;
  }

  if (url) {
    window.location.href = url;
  }

  return payload;
}
