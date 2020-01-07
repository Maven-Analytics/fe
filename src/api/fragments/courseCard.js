import gql from 'graphql-tag';

import imageFragment from './image';

const courseCardFragment = gql`
  fragment courseCard on Course {
    author {
      name
      thumbnail {
        ...image
      }
    }
    cardDescription
    badge {
      ...image
    }
    id
    length
    thumbnail {
      ...image
    }
    title
  }
  ${imageFragment}
`;

export default courseCardFragment;
