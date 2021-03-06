import {LayoutAuth, ResetPassword} from 'maven-ui';
// Import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import {connect, useDispatch} from 'react-redux';

// Import {bindActionCreators} from 'redux';
// import Auth from '#root/components/layout/auth';
import {defaultAuthImages} from '#root/constants';
import {actions as authActions} from '#root/redux/ducks/auth';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {selectors as responseSelectors} from '#root/redux/ducks/response';
// Import {selectors as userSelectors} from '#root/redux/ducks/user';
import {Routes} from '#root/routes';
// Import {state} from '#root/utils/componentHelpers';
import redirect from '#root/utils/redirect';

// Class Reset extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       token: props.token
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(state) {
//     return state ? this.setState(state) : null;
//   }

//   handleSubmit({email, password}) {
//     this.props.actions.reset({
//       email,
//       password,
//       token: this.state.token
//     });
//   }

//   render() {
//     const {email, password} = this.state;
//     const {loading, error, response} = this.props;
//   }
// }

const ResetPasswordPage = ({error, response, token}) => {
  const dispatch = useDispatch();

  return (
    <LayoutAuth images={defaultAuthImages}>
      <ResetPassword
        error={error}
        footerLinks={[
          {
            title: 'Back to Login',
            url: Routes.Login
          },
          {
            title: 'I don\'t have an account yet. Sign me Up!',
            url: Routes.Signup
          }
        ]}
        onComplete={({email, password}) => dispatch(authActions.reset({email, password, token}))}
        response={response}
      />
      {/* <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="text" name="email" id="email" placeholder="Email Address" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" className="input" onChange={state(this.handleChange, 'password')} value={password} required/>
        </div>
        {error || response ? (
          <div className="form-message">
            {error ? (
              <p className="form-text small error">{error}</p>
            ) : null}
            {response ? (
              <p className="form-text small success">{response}</p>
            ) : null}
          </div>
        ) : null}
        <div className="form-footer">
          <span className="submit">
            <button className="btn btn--primary-solid" type="submit" style={{minWidth: 220}} disabled={loading}>Reset Password</button>
          </span>
          <span className="links">
            <Link href={Routes.Login}><a>Back to Login</a></Link>
            <Link href={Routes.Signup}><a>{'I don\'t have an account yet. Sign me Up!'}</a></Link>
          </span>
        </div>
      </form> */}
    </LayoutAuth>
  );
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['RESET'])(state),
  error: errorSelectors.getError(['RESET'])(state),
  response: responseSelectors.getResponse(['RESET'])(state)
});

// Const mapDispatchToProps = function (dispatch) {
//   return {
//     actions: bindActionCreators({
//       ...authActions
//     }, dispatch)
//   };
// };

ResetPasswordPage.getInitialProps = ctx => {
  const {query: {token}} = ctx;

  if (!token) {
    redirect(ctx, '/');
  }

  return {
    token
  };
};

ResetPasswordPage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ResetPasswordPage);
