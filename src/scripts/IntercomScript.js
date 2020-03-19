import React, {memo} from 'react';
import Intercom from 'react-intercom';
import {useSelector} from 'react-redux';

import {selectors as stateSelectors} from '#root/redux/ducks/state';
import {selectors as userSelectors} from '#root/redux/ducks/user';
import {canUseDOM} from '#root/utils/componentHelpers';
import {env} from '#root/constants';

const DISABLE_INTERCOM = env.DISABLE_INTERCOM;

const IntercomScript = () => {
  if (DISABLE_INTERCOM) {
    return null;
  }

  const user = useSelector(userSelectors.getUser);
  const state = useSelector(stateSelectors.getState);

  if (state.get('renderIntercom') === false) {
    return null;
  }

  let userProps = {};

  if (user && user.get('id')) {
    userProps = {
      name: `${user.get('first_name')} ${user.get('last_name')}`,
      email: user.get('email'),
      created_at: user.get('createdAt')
    };
  }

  return <Intercom appID="zvoe91eh" {...userProps} />;
};

export default memo(IntercomScript);
