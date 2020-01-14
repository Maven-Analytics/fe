import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import {useForm} from 'react-hook-form';
import {connect, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import userFragment from '#root/api/fragments/user';
import meQuery from '#root/api/query/me';
import Auth from '#root/components/layout/auth';
import GraphQlError from '#root/components/shared/GraphQlError';

import {actions as authActions} from '../redux/ducks/auth';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as userSelectors} from '../redux/ducks/user';
import {Routes} from '../routes';
import {canUseDOM, state} from '../utils/componentHelpers';

// Class Login extends Component {
//   static async getInitialProps(ctx) {
//     return {
//       redirectTo: ctx.query.redirectTo ? `${ctx.query.redirectTo}` : canUseDOM() ? `${window.location.origin}${Routes.Dashboard}` : null
//     };
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: ''
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(state) {
//     return state ? this.setState(state) : null;
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.actions.login({
//       email: this.state.email,
//       password: this.state.password,
//       redirectTo: this.props.redirectTo && this.props.redirectTo !== '' ? this.props.redirectTo : `${window.location.origin}${Routes.Dashboard}`
//     });
//   }

//   render() {
//     const {email, password} = this.state;
//     const {loading, error} = this.props;
//     return (
//       <Auth>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email address</label>
//             <input type="text" name="email" id="email" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input type="password" name="password" id="password" className="input" onChange={state(this.handleChange, 'password')} value={password} required/>
//           </div>
//           {error ? (
//             <div className="form-message">
//               <p className="form-text small error">{error}</p>
//             </div>
//           ) : null}
//           <div className="form-footer">
//             <span className="submit">
//               <button className="btn btn--primary-solid" type="submit" value="Login" disabled={loading}>Login</button>
//             </span>
//             <span className="links">
//               <Link href={Routes.ForgotPassword}><a>I forgot my password.</a></Link>
//               <Link href={Routes.Signup}><a>{'I don\'t have an account yet. Sign me Up!'}</a></Link>
//             </span>
//           </div>
//         </form>
//       </Auth>
//     );
//   }
// }

const mutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...user
    }
  }
  ${userFragment}
`;

const Login = ({redirectTo}) => {
  const [login, {error, client}] = useMutation(mutation);
  const {formState: {isSubmitting, isSubmitted}, handleSubmit, register, setValue, errors: formErrors, clearError} = useForm();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async ({email, password}) => {
    clearError();
    const redirect = redirectTo && redirectTo !== '' ? redirectTo : `${window.location.origin}${Routes.Dashboard}`;

    const {data: {login: loginData}} = await login({
      variables: {email, password}
    });

    await client.resetStore();
    await client.cache.reset();

    dispatch(authActions.login({...loginData, redirectTo: redirect}));
  });

  return (
    <Auth>
      <form onSubmit={onSubmit}>
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
      </form>
    </Auth>
  );
};

Login.getInitialProps = async ctx => {
  return {
    redirectTo: ctx.query.redirectTo ? `${ctx.query.redirectTo}` : canUseDOM() ? `${window.location.origin}${Routes.Dashboard}` : null
  };
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['LOGIN'])(state),
  error: errorSelectors.getError(['LOGIN'])(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions
    }, dispatch)
  };
};

Login.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  redirectTo: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
