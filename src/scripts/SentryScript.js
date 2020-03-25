import * as Sentry from '@sentry/browser';
import {memo} from 'react';

import accessConfig from '#root/utils/accessConfig';

const SentryScript = () => {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  Sentry.init({dsn: 'https://fa3ec528363e494188ec3638755f3ce9@sentry.io/1862460'});

  Sentry.configureScope(scope => {
    scope.setTag('environment', accessConfig('SENTRY_ENVIRONMENT'));
  });

  return null;
};

export default memo(SentryScript);
