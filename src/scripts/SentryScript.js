import * as Sentry from '@sentry/browser';
import {memo} from 'react';
import {useSelector} from 'react-redux';

import accessConfig from '#root/utils/accessConfig';
import {selectors as userSelectors} from '#root/redux/ducks/user';

const SentryScript = () => {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  const user = useSelector(userSelectors.getUser);

  Sentry.init({dsn: 'https://fa3ec528363e494188ec3638755f3ce9@sentry.io/1862460'});

  Sentry.configureScope(scope => {
    scope.setTag('environment', accessConfig('SENTRY_ENVIRONMENT'));
    scope.setUser({
      email: user.get('email'),
      id: user.get('id')
    });
  });

  return null;
};

export default memo(SentryScript);
