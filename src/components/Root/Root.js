import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import UserSettingFragment from '#root/api/fragments/UserSetting';
import subscriptionStatusQuery from '#root/api/query/subscriptionStatus';
import {actions as subscriptionActions, selectors as subscriptionSelectors} from '#root/redux/ducks/subscription';
import {actions as userSettingsActions} from '#root/redux/ducks/userSettings';

import withUser from '../withUser';

const userSettingsQuery = gql`
{
  userSettings {
    ...UserSetting
  }
}
${UserSettingFragment}
`;

const Root = memo(({children, user}) => {
  const dispatch = useDispatch();
  const subscription = useSelector(subscriptionSelectors.getSubscription);
  const {data: {subscriptionStatus} = {}} = useQuery(subscriptionStatusQuery);
  const {data: {userSettings} = {}} = useQuery(userSettingsQuery);

  if (user && user.get('id') && subscriptionStatus) {
    if (!subscription.get('subscription_status')) {
      dispatch(subscriptionActions.subscriptionSet(subscriptionStatus));
    }
  }

  if (user && user.get('id') && userSettings) {
    dispatch(userSettingsActions.userSettingsSet(userSettings));
  }

  return children;
});

export default withUser(Root);
