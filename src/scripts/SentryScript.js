import * as Sentry from '@sentry/browser';
import {memo} from 'react';

import {env} from '#root/constants';

const SENTRY_ENVIRONMENT = env.SENTRY_ENVIRONMENT;

const SentryScript = () => {
  Sentry.init({dsn: 'https://fa3ec528363e494188ec3638755f3ce9@sentry.io/1862460'});

  Sentry.configureScope(scope => {
    scope.setTag('environment', SENTRY_ENVIRONMENT);
  });

  return null;
};

export default memo(SentryScript);
