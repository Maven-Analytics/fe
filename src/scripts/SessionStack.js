import {memo, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {selectors as userSelectors} from '#root/redux/ducks/user';
import accessConfig from '#root/utils/accessConfig';

const SessionStackScript = () => {
  if (accessConfig('DISABLE_SS', false)) {
    return null;
  }

  const user = useSelector(userSelectors.getUser);

  useEffect(() => {
    window.SessionStack.identify({
      displayName: `${user.get('first_name')} ${user.get('last_name')}`,
      email: user.get('email'),
      userId: user.get('id')
    });
  }, []);

  return null;
};

export default memo(SessionStackScript);
