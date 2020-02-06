import gql from 'graphql-tag';

const subscriptionStatusQuery = gql`
query SubscriptionStatus {
  subscriptionStatus {
    subscription_status
    subscriptions {
      id
      plan_id
    }
  }
}
`;

export default subscriptionStatusQuery;
