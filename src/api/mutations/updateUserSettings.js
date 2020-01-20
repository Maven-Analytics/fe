import gql from 'graphql-tag';

import UserSettingFragment from '../fragments/UserSetting';

const updateUserSettingsMutation = gql`
mutation updateUserSettings($settings: [UserSettingInput!]!) {
  updateUserSettings(settings: $settings) {
    ...UserSetting
  }
}
${UserSettingFragment}
`;

export default updateUserSettingsMutation;
