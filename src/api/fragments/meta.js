import gql from 'graphql-tag';

import imageFragment from './image';

const metaFragment = gql`
  fragment meta on Meta {
    id
    description
    image {
      ...image
    }
    keywords
    title
  }
  ${imageFragment}
`;

export default metaFragment;
