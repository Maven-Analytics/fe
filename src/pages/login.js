import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {LayoutAuth, Login} from 'maven-ui';
import {useRouter} from 'next/router';
// Import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
// Import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

// Import {bindActionCreators} from 'redux';
import userFragment from '#root/api/fragments/user';
// Import Auth from '#root/components/layout/auth';
// import GraphQlError from '#root/components/shared/GraphQlError';
import {defaultAuthImages} from '#root/constants';

import {actions as authActions} from '../redux/ducks/auth';
// Import {selectors as errorSelectors} from '../redux/ducks/error';
// import {selectors as loadingSelectors} from '../redux/ducks/loading';
// import {selectors as userSelectors} from '../redux/ducks/user';
import {Routes} from '../routes';
import {canUseDOM} from '../utils/componentHelpers';

const mutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...user
    }
  }
  ${userFragment}
`;

const LoginPage = ({redirectTo}) => {
  const [login, {error, client}] = useMutation(mutation);
  // Const {formState: {isSubmitting, isSubmitted}, handleSubmit, register, setValue, errors: formErrors, clearError} = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async ({email, password}) => {
    const redirect = redirectTo && redirectTo !== '' ? redirectTo.replace(window.location.origin, '') : Routes.Dashboard;

    const {
      data: {login: loginData}
    } = await login({
      variables: {email, password}
    });

    await client.resetStore();
    await client.cache.reset();

    dispatch(authActions.login({...loginData, redirectTo: redirect}));
    router.push(redirect);
  };

  return (
    <LayoutAuth images={defaultAuthImages}>
      <Login
        error={error}
        footerLinks={[
          {
            title: 'I forgot my password.',
            url: Routes.ForgotPassword
          },
          {
            // eslint-disable-next-line quotes
            title: "I don't have an account yet. Sign me Up!",
            url: Routes.Signup
          }
        ]}
        onComplete={onSubmit}
      />
      {/* <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input ref={register({required: true})} disabled={isSubmitting} type="text" name="email" id="email" className="input" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input ref={register({required: true, minLength: 6})} disabled={isSubmitting} type="password" name="password" id="password" className="input" onKeyUp={e => setValue('password', e.target.value, true)} required/>
          {isSubmitted && formErrors.password ? (
            <p className="form-text small error">
              {formErrors.password.type === 'minLength' ? 'Password must be at least 6 characters in length.' : null}
              {formErrors.password.type === 'required' ? 'Password is required.' : null}
            </p>
          ) : null}
        </div>
        {error ? (
          <div className="form-message">
            <p className="form-text small error">
              <GraphQlError error={error}/>
            </p>
          </div>
        ) : null}
        <div className="form-footer">
          <span className="submit">
            <button className="btn btn--primary-solid" type="submit" value="Login" disabled={isSubmitting}>Login</button>
          </span>
          <span className="links">
            <Link href={Routes.ForgotPassword}><a>I forgot my password.</a></Link>
            <Link href={Routes.Signup}><a>{'I don\'t have an account yet. Sign me Up!'}</a></Link>
          </span>
        </div>
      </form> */}
    </LayoutAuth>
  );
};

LoginPage.getInitialProps = async ctx => {
  return {
    redirectTo: ctx.query.redirectTo ? `${ctx.query.redirectTo}` : canUseDOM() ? `${window.location.origin}${Routes.Dashboard}` : null
  };
};

LoginPage.propTypes = {
  redirectTo: PropTypes.string
};

export default LoginPage;
