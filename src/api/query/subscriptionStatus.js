import gql from 'graphql-tag';

const subscriptionStatusQuery = gql`
query SubscriptionStatus {
  subscriptionStatus {
    subscription_status
  }
}
`;

export default subscriptionStatusQuery;
