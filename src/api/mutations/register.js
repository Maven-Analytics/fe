import gql from 'graphql-tag';

import userFragment from '../fragments/user';

const registerMutation = gql`
mutation register($email:String!, $password: String!, $first_name: String!, $last_name: String!, $country: String!, $postal_code: String!) {
  register(email: $email, password: $password, first_name: $first_name, last_name: $last_name, country: $country, postal_code: $postal_code) {
    ...user
  }
}
${userFragment}
`;

export default registerMutation;
