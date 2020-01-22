import React, {memo} from 'react';
import Intercom from 'react-intercom';
import {useSelector} from 'react-redux';

import accessConfig from '#root/utils/accessConfig';

import {selectors as userSelectors} from '../redux/ducks/user';

const IntercomScript = () => {
  if (accessConfig('DISABLE_INTERCOM', false)) {
    return null;
  }

  const user = useSelector(userSelectors.getUser);

  let userProps = {};

  if (user && user.get('id')) {
    userProps = {
      name: `${user.get('first_name')} ${user.get('last_name')}`,
      email: user.get('email'),
      created_at: user.get('createdAt')
    };
  }

  return (
    <Intercom
      appID="zvoe91eh"
      {...userProps}
    />
  );
};

export default memo(IntercomScript);
