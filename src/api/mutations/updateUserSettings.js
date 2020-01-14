import gql from 'graphql-tag';

import UserSettingFragment from '../fragments/userSetting';

const updateUserSettingsMutation = gql`
mutation updateUserSettings($settings: [UserSettingInput!]!) {
  updateUserSettings(settings: $settings) {
    ...UserSetting
  }
}
${UserSettingFragment}
`;

export default updateUserSettingsMutation;
