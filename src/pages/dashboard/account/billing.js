import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {List, Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import AccountList from '#root/components/dashboard/AccountList';
import AccountPaymentMethods from '#root/components/dashboard/AccountPaymentMethods/AccountPaymentMethods';
import AccountLayout from '#root/components/layout/account';
import withAuthSync from '#root/components/withAuthSync';
import {planIds} from '#root/constants';
import {formatDateMMDDYYYY} from '#root/utils/componentHelpers';

const myPaymentMethodsQuery = gql`
query MyPaymentMethods {
  myPaymentMethods {
    brand
    id
    exp_month
    exp_year
    last4
  }
}
`;

const mySubscriptionsQuery = gql`
query MySubscriptions {
  mySubscriptions {
    id
    canceled_at
    current_period_end
    current_period_start
    plan_id
    status
  }
}
`;

const cancelMutation = gql`
mutation CancelMutation($subscriptionId: Int!) {
  subscriptionCancel(subscriptionId: $subscriptionId) {
    id
  }
}
`;

const resumeMutation = gql`
mutation ResumeMutation($subscriptionId: Int!) {
  subscriptionResume(subscriptionId: $subscriptionId) {
    id
    status
    canceled_at
  }
}
`;

const AccountBilling = () => {
  const {data: {mySubscriptions = []} = {}, loading: subscriptionsFetching, refetch} = useQuery(mySubscriptionsQuery);
  const {data: {myPaymentMethods = []} = {}, loading: paymentMethodsFetching} = useQuery(myPaymentMethodsQuery);
  const [cancelSubscription, {loading: isCancelling}] = useMutation(cancelMutation);
  const [resumeSubscription, {loading: isRenewing}] = useMutation(resumeMutation);

  const handleCancel = async subscriptionId => {
    await cancelSubscription({
      variables: {subscriptionId}
    });
    refetch();
  };

  const handleRenew = async subscriptionId => {
    await resumeSubscription({
      variables: {subscriptionId}
    });
    refetch();
  };

  return (
    <AccountLayout title="Billing" activeLink={2}>
      <AccountPaymentMethods paymentMethods={myPaymentMethods}/>
      <AccountList
        columns={[
          {renderItem: subscription => planIds[subscription.plan_id], label: 'Subscription'},
          {renderItem: subscription => formatDateMMDDYYYY(subscription.current_period_start), label: 'Started At'},
          {renderItem: subscription => formatDateMMDDYYYY(subscription.current_period_end), label: 'Renews On'},
          {
            // eslint-disable-next-line react/display-name
            renderItem: subscription => (
              <>
                {subscription.status === 'canceled' ? (
                  <>
                    Canceled on {formatDateMMDDYYYY(subscription.canceled_at)}
                  </>
                ) : (
                  subscription.canceled_at ? (
                    <button
                      className="btn btn--sm btn--primary-solid"
                      onClick={() => handleRenew(subscription.id)}
                      style={{paddingBottom: 0, paddingTop: 0}}
                    >
                      Renew Subscription
                    </button>
                  ) : (
                    <button
                      className="btn btn--sm btn--default"
                      disabled={subscription.canceled_at}
                      onClick={() => handleCancel(subscription.id)}
                      style={{paddingBottom: 0, paddingTop: 0}}
                    >
                      Cancel Subscription
                    </button>
                  )
                )}
              </>
            ),
            itemClass: 'buttons',
            label: ''
          }
        ]}
        columnClassList={['col-sm-3', 'col-sm-3', 'col-sm-3', 'col-sm-3']}
        data={mySubscriptions}
        disabled={subscriptionsFetching || paymentMethodsFetching || isCancelling || isRenewing}
        title="Subscriptions"
      />
    </AccountLayout>
  );
};

AccountBilling.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

AccountBilling.defaultProps = {
  user: Map(),
  recommendedPaths: List(),
  recommendedCourses: List()
};

export default withAuthSync(AccountBilling);
