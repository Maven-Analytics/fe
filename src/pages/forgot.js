import {ForgotPassword, LayoutAuth} from 'maven-ui';
// Import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import {connect, useDispatch} from 'react-redux';

// Import {bindActionCreators} from 'redux';
// import Auth from '#root/components/layout/auth';
import {defaultAuthImages} from '#root/constants';

import {actions as authActions} from '../redux/ducks/auth';
import {selectors as errorSelectors} from '../redux/ducks/error';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as responseSelectors} from '../redux/ducks/response';
// Import {selectors as userSelectors} from '../redux/ducks/user';
import {Routes} from '../routes';
// Import {state} from '../utils/componentHelpers';

// Class Forgot extends Component {
//   constructor(props) {
//     super(props);

//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit({email}) {
//     this.props.actions.forgot({
//       email
//     });
//   }

//   render() {
//     const {loading, error, response} = this.props;
//     return (

//     );
//   }
// }

const ForgotPasswordPage = ({error, response}) => {
  const dispatch = useDispatch();
  return (
    <LayoutAuth images={defaultAuthImages}>
      <ForgotPassword
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
        onComplete={({email}) => dispatch(authActions.forgot({email}))}
        response={response}
      />
      {/* <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="text" name="email" id="email" className="input" onChange={state(this.handleChange, 'email')} value={email} required/>
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
          <button className="btn btn--primary-solid" style={{minWidth: 220}} type="submit" disabled={loading}>Reset My Password</button>
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
  loading: loadingSelectors.getLoading(['FORGOT'])(state),
  error: errorSelectors.getError(['FORGOT'])(state),
  response: responseSelectors.getResponse(['FORGOT'])(state)
});

ForgotPasswordPage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ForgotPasswordPage);
