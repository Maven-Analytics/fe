import gql from 'graphql-tag';

import imageFragment from './image';

const spotlightFragment = gql`
  fragment spotlight on Spotlight {
    callout
    completedCourses
    description
    id
    image {
      ...image
    }
    location
    name
    order
    text
    title
  }
  ${imageFragment}
`;

export default spotlightFragment;
