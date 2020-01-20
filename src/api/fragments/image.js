import gql from 'graphql-tag';

const imageFragment = gql`
fragment image on Image {
  id
  title
  file {
    url
    contentType
    details {
      size
      image {
        width
        height
      }
    }
  }
}
`;

export default imageFragment;
