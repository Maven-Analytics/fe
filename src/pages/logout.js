import gql from 'graphql-tag';

import {actions as userActions} from '#root/redux/ducks/user';
import {Routes} from '#root/routes';
import {removeCookie} from '#root/utils/cookies';
import redirect from '#root/utils/redirect';

const logoutMutation = gql`
  mutation {
    logout {
      success
    }
  }
`;

const LogoutPage = () => {
  return null;
};

LogoutPage.getInitialProps = async ({apolloClient, store, ...ctx}) => {
  // Get rid of session on server
  await apolloClient.mutate({mutation: logoutMutation});

  // Clear the apollo cache
  await apolloClient.resetStore();
  await apolloClient.cache.reset();

  // Remove JWTs
  removeCookie('token', ctx);
  removeCookie('thinkificToken', ctx);
  removeCookie('checkout', ctx);

  // Unset the user
  store.dispatch(userActions.userUnset());

  // Redirect to home page
  redirect(ctx, Routes.Home);

  return {};
};

export default LogoutPage;

