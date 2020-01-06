import gql from 'graphql-tag';

const userFragment = gql`
fragment user on User {
  id
  first_name
  last_name
  email
  postal_code
  country
}
`;

export default userFragment;
