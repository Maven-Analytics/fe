import gql from 'graphql-tag';

const userFragment = gql`
  fragment user on User {
    avatar_url
    country
    email
    first_name
    id
    last_name
    postal_code
    token
    thinkificToken
    recommended_courses {
      id
      percentage
    }
    recommended_paths {
      id
      percentage
    }
  }
`;

export default userFragment;
