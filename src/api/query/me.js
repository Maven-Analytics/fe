import gql from 'graphql-tag';

import userFragment from '../fragments/user';

const meQuery = gql`
{
  me {
    ...user
  }
}
${userFragment}
`;

export default meQuery;
