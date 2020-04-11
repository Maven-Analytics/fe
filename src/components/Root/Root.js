import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {useDispatch, useSelector} from 'react-redux';

import UserSettingFragment from '#root/api/fragments/UserSetting';
import subscriptionStatusQuery from '#root/api/query/subscriptionStatus';
import {actions as subscriptionActions, selectors as subscriptionSelectors} from '#root/redux/ducks/subscription';
import {actions as userSettingsActions} from '#root/redux/ducks/userSettings';
import {selectors as userSelectors} from '#root/redux/ducks/user';

import Modals from './Modals';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

const userSettingsQuery = gql`
  {
    userSettings {
      ...UserSetting
    }
  }
  ${UserSettingFragment}
`;

const Root = ({children}) => {
  const dispatch = useDispatch();
  const subscription = useSelector(subscriptionSelectors.getSubscription);
  const user = useSelector(userSelectors.getUser);

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

  return (
    <>
      <SiteHeader />
      {children}
      <Modals />
      <SiteFooter />
    </>
  );
};

Root.propTypes = {
  children: PropTypes.any,
  user: ImmutablePropTypes.map
};

export default Root;
