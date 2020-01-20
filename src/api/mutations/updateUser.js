import gql from 'graphql-tag';

import userFragment from '../fragments/user';

const updateUserMutation = gql`
mutation updateUser($email:String!, $first_name: String!, $last_name: String!, $country: String!, $postal_code: String!, $currentPassword: String, $newPassword: String, $confirmPassword: String) {
  updateUser(email: $email, first_name: $first_name, last_name: $last_name, country: $country, postal_code: $postal_code, currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword) {
    ...user
  }
}
${userFragment}
`;

export default updateUserMutation;
