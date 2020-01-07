import gql from 'graphql-tag';

import metaFragment from './meta';

const pageFragment = gql`
  fragment page on Page {
    id
    meta {
      ...meta
    }
    slug
    title
  }
  ${metaFragment}
`;

export default pageFragment;
