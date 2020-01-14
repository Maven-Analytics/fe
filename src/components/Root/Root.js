import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useDispatch} from 'react-redux';

import UserSettingFragment from '#root/api/fragments/UserSetting';
import {actions as userSettingsActions} from '#root/redux/ducks/userSettings';

const userSettingsQuery = gql`
{
  userSettings {
    ...UserSetting
  }
}
${UserSettingFragment}
`;

const Root = ({children}) => {
  const {data: {userSettings} = {}} = useQuery(userSettingsQuery);
  const dispatch = useDispatch();

  if (userSettings) {
    dispatch(userSettingsActions.userSettingsSet(userSettings));
  }

  return children;
};

export default Root;
