import {useMutation} from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import React, {Component, useState} from 'react';
import {useForm} from 'react-hook-form';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';

import updateUserMutation from '#root/api/mutations/updateUser';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as profileActions} from '#root/redux/ducks/profile';
import {selectors as responseSelectors} from '#root/redux/ducks/response';
import {selectors as userSelectors} from '#root/redux/ducks/user';

import {state} from '../../utils/componentHelpers';
import TextBox from '../inputs/TextBox';
import GraphQlError from '../shared/GraphQlError';

// Class PasswordResetForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentPassword: 'password',
//       newPassword: 'password',
//       confirmPassword: 'password'
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.actions.passwordReset({
//       currentPassword: this.state.currentPassword,
//       newPassword: this.state.newPassword,
//       confirmPassword: this.state.confirmPassword
//     });
//   }

//   handleChange(state) {
//     return state ? this.setState(state) : null;
//   }

//   isValid() {
//     const {currentPassword, newPassword, confirmPassword} = this.state;

//     if (!currentPassword || currentPassword === '') {
//       return false;
//     }

//     if (!newPassword || newPassword === '' || newPassword.length < 6) {
//       return false;
//     }

//     if (!confirmPassword || confirmPassword === '' || confirmPassword !== newPassword) {
//       return false;
//     }

//     return true;
//   }

//   render() {
//     const {currentPassword, newPassword, confirmPassword} = this.state;
//     const {error, response, loading} = this.props;

//     const canSubumit = this.isValid() && !loading;

//     return (
//       <form onSubmit={this.handleSubmit} className="form--light form--account">
//         <div className="form-group">
//           <label htmlFor="currentPassword">Current password</label>
//           <input
//             required
//             className="input"
//             id="currentPassword"
//             name="currentPassword"
//             onChange={state(this.handleChange, 'currentPassword')}
//             value={currentPassword}
//             type="password"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="newPassword">New password</label>
//           <input
//             required
//             className="input"
//             id="newPassword"
//             name="newPassword"
//             onChange={state(this.handleChange, 'newPassword')}
//             value={newPassword}
//             type="password"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm new password</label>
//           <input
//             required
//             className="input"
//             id="confirmPassword"
//             name="confirmPassword"
//             onChange={state(this.handleChange, 'confirmPassword')}
//             value={confirmPassword}
//             type="password"
//           />
//         </div>
//         {error || response ? (
//           <div className="form-message">
//             {error ? (
//               <p className="form-text small error">{error}</p>
//             ) : null}
//             {response ? (
//               <p className="form-text small success">{response}</p>
//             ) : null}
//           </div>
//         ) : null}
//         <div className="form-footer">
//           <button type="submit" onClick={this.handleSubmit} disabled={!canSubumit} className="btn btn--primary-solid">
//             Update
//           </button>
//         </div>
//       </form>
//     );
//   }
// }

const PasswordResetForm = () => {
  const [updateUser, {error}] = useMutation(updateUserMutation);
  const user = useSelector(userSelectors.getUser);
  const [response, setResponse] = useState(null);
  const {formState: {isSubmitting}, handleSubmit, register} = useForm();

  const onSubmit = handleSubmit(async ({currentPassword, newPassword, confirmPassword}) => {
    setResponse(null);
    await updateUser({
      variables: {...user.toJS(), currentPassword, newPassword, confirmPassword}
    });

    setResponse('Your password has been reset!');
  });

  // TODO: add frontend form validateion

  return (
    <form onSubmit={onSubmit} className="form--light form--account">
      <TextBox
        required
        id="currentPassword"
        label="Current password"
        name="currentPassword"
        register={register}
        type="password"
      />
      <TextBox
        required
        id="newPassword"
        label="New password"
        name="newPassword"
        register={register}
        type="password"
      />
      <TextBox
        required
        id="confirmPassword"
        label="Confirm new password"
        name="confirmPassword"
        register={register}
        type="password"
      />
      {error || response ? (
        <div className="form-message">
          {error ? (
            <p className="form-text small error"><GraphQlError error={error}/></p>
          ) : null}
          {response ? (
            <p className="form-text small success">{response}</p>
          ) : null}
        </div>
      ) : null}
      <div className="form-footer">
        <button type="submit" onClick={onSubmit} disabled={isSubmitting} className="btn btn--primary-solid">
          Update
        </button>
      </div>
    </form>
  );
};

PasswordResetForm.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  response: PropTypes.string
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['PROFILE_PASSWORD_RESET'])(state),
  error: errorSelectors.getError(['PROFILE_PASSWORD_RESET'])(state),
  response: responseSelectors.getResponse(['PROFILE_PASSWORD_RESET'])(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...profileActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);
