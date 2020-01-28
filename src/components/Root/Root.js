import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useDispatch, useSelector} from 'react-redux';

import UserSettingFragment from '#root/api/fragments/UserSetting';
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

const subscriptionStatusQuery = gql`
query SubscriptionStatus {
  subscriptionStatus {
    subscription_status
  }
}
`;

const Root = ({children, user}) => {
  const dispatch = useDispatch();
  const subscription = useSelector(subscriptionSelectors.getSubscription);

  if (user && user.get('id')) {
    const {data: {subscriptionStatus} = {}} = useQuery(subscriptionStatusQuery);
    if (subscriptionStatus && !subscription.get('subscription_status')) {
      dispatch(subscriptionActions.subscriptionSet(subscriptionStatus));
    }
  }

  if (user && user.get('id')) {
    const {data: {userSettings} = {}} = useQuery(userSettingsQuery);

    if (userSettings) {
      dispatch(userSettingsActions.userSettingsSet(userSettings));
    }
  }

  return children;
};

export default withUser(Root);
