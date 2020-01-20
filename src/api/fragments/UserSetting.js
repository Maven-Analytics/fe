import gql from 'graphql-tag';

const UserSettingFragment = gql`
  fragment UserSetting on UserSetting {
    id
    key
    name
    value
    setting_id    
  }
`;

export default UserSettingFragment;
